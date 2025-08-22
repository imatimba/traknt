// ==UserScript==
// @name        traknt
// @namespace   imatimba
// @match        https://trakt.tv/calendars*
// @match        http://trakt.tv/calendars*
// @grant       none
// @version     1.2
// @author      imatimba
// @description 4/16/2022, 12:33:16 AM
// @require     https://raw.githubusercontent.com/abdolence/x2js/master/xml2json.min.js
// ==/UserScript==

let getRomajiQueue = Promise.resolve();

(async function initialize() {
  "use strict";
  const gridItems = document.querySelectorAll(".grid-item");
  const jpTvNetworks = [
    "Fuji TV",
    "HTB",
    "Nippon TV",
    "MBS",
    "tv asahi",
    "TV Tokyo",
    "TBS",
    "ANIMAX",
    "AT-X",
    "WOWOW Prime",
    "CBC",
    "NHK BS1",
    "TV Aichi",
    "Gunma TV",
    "NHK G\t",
    "YTV",
    "Nagoya TV",
    "Kids Station",
    "Tokyo MX",
    "NHK Educational TV",
    "Nikkei CNBC",
    "Chiba TV",
    "Teletama",
    "JNN",
    "tvk",
    "Sun TV",
    "TV Osaka",
    "TVQ",
    "BS11",
    "BS-TBS",
    "Tokai Television Broadcasting",
    "Tulip Television",
    "Bandai Channel",
    "All-Nippon News Network",
    "TVh",
    "SKY PerfecTV!",
    "Star Channel",
    "Niconico",
    "KBS Kyoto",
    "BS Fuji",
    "Kansai TV",
    "BS SKY PerfecTV!",
    "GBS",
    "Mie TV",
    "BS Japan",
    "Kyushu Asahi Broadcasting",
    "ABC TV",
    "ABEMA",
    "AbemaTV",
    "SBC",
    "BS Asahi",
    "Hulu",
    "Video Pass",
    "Nifty-Serve",
    "FBS",
    "NHK BS2",
    "TV Setouchi",
    "dTV",
    "NET",
    "MTV Japan",
    "Nitteleplus",
    "NHK BS Premium",
    "NHK",
    "Fuji TV NEXT",
    "Dlife",
    "tys",
    "NBC",
    "BSN",
    "Tochigi TV",
    "BeeTV",
    "AnimeFesta",
    "Jumondo",
    "Chukyo TV",
    "RNB",
    "FOD",
    "GyaO!",
    "Toei Tokusatsu Fan Club",
    "Family Gekijo",
    "Yahoo! Dōga",
    "Nippon News Network",
    "Fuji News Network",
    "TXN Network",
    "Hokkaido TV",
    "BS4",
    "Hikari TV",
    "Hikari TV Channel+",
    "BS TV Tokyo",
    "FCT",
    "HBC",
    "Sapporo Television Broadcasting",
    "d Anime Store",
    "RKK Kumamoto Broadcasting",
    "Hokkaido Cultural Broadcasting",
    "Kitanihon Broadcasting",
    "Rakuten TV",
    "Yomiuri Telecasting Corporation",
    "Anime Houdai",
    "Nagasaki Culture Telecasting Corporation",
    "Chubu-Nippon Broadcasting",
    "U-NEXT",
    "Paravi",
    "Nara Television",
    "i-Television",
    "SBS TV\t",
    "TV-U Fukushima",
    "Hokuriku Broadcasting",
    "RSK Sanyo Broadcasting",
    "Oita Broadcasting System",
    "Tulip-TV",
    "TV-U Yamagata",
    "Tohoku Broadcasting",
    "Wakayama Telecasting",
    "Broadcasting System of San-in",
    "Iwate Broadcasting",
    "Fuji TV TWO",
    "NHK BS4K",
    "MONDO TV",
    "Disney Channel",
    "NHK WORLD-JAPAN",
    "RKB",
    "TELASA",
    "OHK",
    "MUSIC ON! TV",
    "Kawaiian TV",
    "TSS",
    "YNN",
    "Kayo Pops Channel",
    "NHKデジタル衛星ハイビジョン",
    "NHK BS8K",
    "ADK",
    "BS12 TwellV",
    "Tsuburaya Imagination",
    "Nihon Eiga",
    "Mainichi Broadcasting System",
    "時代劇専門ch",
    "TV Shizuoka",
    "Anistream",
    "Okinawa Television Broadcasting",
    "MBC South Japan Broadcasting",
    "Tencent Video",
  ];

  await sleep(2000);
  gridItems.forEach(async (element) => {
    const showTraktUrl = element.firstChild.content;
    const showName = element.querySelector(
      "div.titles span.hidden meta"
    )?.content;
    const tvNetwork = element.querySelector(
      "div.titles h4.generic"
    )?.textContent;
    let isAnime = false;

    if (!showTraktUrl) {
      //handle the VIP ad that takes a grid space
      return;
    } else {
      if (jpTvNetworks.includes(tvNetwork)) {
        isAnime = true;
      }
      if (isAnime) {
        const show = await getAnime(showName, showTraktUrl);
        const result = await getLink(show, isAnime);

        let link, filename;
        if (Array.isArray(result)) {
          [link, filename] = result;
        } else {
          link = filename = null;
        }
        if (link) {
          insertHtml(link, filename, element);
        }
      }
    }
  });
})();

async function getLink(showObj, isAnime) {
  const baseUrl = "http://127.0.0.1:9117/api/v2.0/indexers/";
  const jApiKey = "gpuwmvml5dp37c5wce8fbzbzj2wn4d8c";
  const x2js = new X2JS();
  // Support both array and string for showObj.name
  const names = Array.isArray(showObj.name) ? showObj.name : [showObj.name];

  const epNum = parseInt(showObj.episode, 10);
  const epRegex = epNum < 10
    ? `S[0-9]{2}E0${epNum}`
    : `S[0-9]{2}E${epNum}`;

  let globalTopSeeders = 0;
  let globalTopLink = null;
  let globalTopFilename = null;

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const url = `${baseUrl}${
      isAnime ? "nyaasi" : "1337x"
    }/results/torznab/api?q=${name}${
      showObj.season === "" ? "" : `+S${showObj.season}`
    }${isAnime ? "+" : "E"}${showObj.episode}${
      !isAnime ? "+1080" : ""
    }&apikey=${jApiKey}`;
    //console.debug(`[getLink] Fetching URL: ${url}`);
    try {
      const response = await fetch(url);
      const xmlResponse = await response.text();
      const jsonResponse = x2js.xml_str2json(xmlResponse);
      const searchResults = jsonResponse.rss.channel.item;
      console.debug(`[getLink] Search for name: ${name}`, searchResults);
      if (Array.isArray(searchResults)) {
        searchResults.forEach((obj) => {
          if (
            isAnime &&
            ((!obj.title.includes(` ${showObj.episode} `) &&
            !obj.title.match(new RegExp(epRegex))) ||
            obj.title.includes("720" || "480"))
          ) {
            return;
          }
          const seeders = getSeeders(obj);
          let link = obj.link;
          let filename = obj.title;
          if (seeders > globalTopSeeders) {
            globalTopSeeders = seeders;
            globalTopLink = link;
            globalTopFilename = filename;
          }
        });
      } else if (typeof searchResults === "object" && searchResults !== null) {
        if (isAnime) {
          if (
            (searchResults.title.includes(` ${showObj.episode} `) || 
            searchResults.title.match(new RegExp(epRegex))) &&
            !searchResults.title.includes("720" || "480")
          ) {
            const seeders = getSeeders(searchResults);
            if (seeders > globalTopSeeders) {
              globalTopSeeders = seeders;
              globalTopLink = searchResults.link;
              globalTopFilename = searchResults.title;
            }
          }
        } else {
          const seeders = getSeeders(searchResults);
          if (seeders > globalTopSeeders) {
            globalTopSeeders = seeders;
            globalTopLink = searchResults.link;
            globalTopFilename = searchResults.title;
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  console.debug(
    `[getLink] Global top link: ${globalTopLink}, Global top filename: ${globalTopFilename}`
  );
  if (globalTopLink) {
    return [globalTopLink, globalTopFilename];
  } else {
    return null;
  }
}

function insertHtml(link, filename, element) {
  const iconHtml = `
    <a class="watch-now" href="${link}" title="${filename}">
        <img class="trakt-icon-collection-thick" src="data:image/png;base64, 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"
        alt="Magnet Icon">
    </a>
    `;
  element
    .querySelector("div.quick-icons div.actions")
    .insertAdjacentHTML("beforeend", iconHtml);
}

function getShow(showNameStr, showLink) {
  const showName = showNameStr.replaceAll(" ", "+");
  let showSeason = showLink.match(/(?<=seasons\/\s*).*?(?=\s*\/episodes)/gs)[0];
  let showEpisode = showLink.match(/(?<=episodes\/\s*).*?(.*)/gs)[0];

  if (showSeason < 10) {
    showSeason = "0" + showSeason;
  }
  if (showEpisode < 10) {
    showEpisode = "0" + showEpisode;
  }

  const showData = {
    name: showName,
    season: showSeason,
    episode: showEpisode,
  };

  return showData;
}

async function getAnime(showNameStr, showLink) {
  const showName = await getRomaji(showNameStr);
  let showSeason = showLink.match(/(?<=seasons\/\s*).*?(?=\s*\/episodes)/gs)[0];
  let showEpisode = showLink.match(/(?<=episodes\/\s*).*?(.*)/gs)[0];

  if (showEpisode < 10) {
    showEpisode = "0" + showEpisode;
  }
  if (showSeason == 1 || showEpisode > 50) {
    showSeason = "";
  }
  const showData = {
    name: showName,
    season: showSeason,
    episode: showEpisode,
  };
  console.dir(showData);
  return showData;
}

async function getRomaji(showNameStr) {
  getRomajiQueue = getRomajiQueue.then(async () => {
    // Wait 500ms before each request except the first
    if (getRomaji.lastCall) {
      const wait = 500 - (Date.now() - getRomaji.lastCall);
      if (wait > 0) {
        //console.debug(`[getRomaji] Queue: waiting ${wait}ms for`, showNameStr);
        await new Promise((res) => setTimeout(res, wait));
      }
    }
    getRomaji.lastCall = Date.now();
    //console.debug(`[getRomaji] Queue: sending request for`, showNameStr);

    const query = `
    query ($search: String) {
        Media (search: $search, type: ANIME, sort: TRENDING_DESC) {
          title {
            romaji
            english
          }
          synonyms
       }
    }
    `;
    const variables = {
      search: showNameStr,
    };
    const url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
          variables: variables,
        }),
      };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      //console.debug(`[getRomaji] Response for`, showNameStr, json);
      const romaji = cleanName(json.data.Media.title.romaji).replaceAll(" ", "+");
      const english = cleanName(json.data.Media.title.english).replaceAll(" ", "+");
      let synonym = null;
      if (
        json.data.Media.synonyms &&
        Array.isArray(json.data.Media.synonyms) &&
        json.data.Media.synonyms[0]
      ) {
        synonym = cleanName(json.data.Media.synonyms[0]).replaceAll(" ", "+");
      }
      const showName = synonym ? [romaji, english, synonym] : [romaji, english];
      return showName;
    } catch (error) {
      console.error(error);
    }
  });
  return getRomajiQueue;
}

function getSeeders(seedObj) {
  let seeders;
  seedObj.attr.forEach((attr) => {
    if (attr._name === "seeders") seeders = Number(attr._value);
  });
  return seeders;
}

function cleanName(nameStr) {
  const regex = /^.*?(?=2nd|[0-9]th|Part|Season|SEASON| 2|:|$)/gs;
  return nameStr.match(regex)[0].trim();
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function containsOnlyAscii(str) {
  return /^[\u0000-\u007f]*$/.test(str);
}
