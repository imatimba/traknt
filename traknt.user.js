// ==UserScript==
// @name        traknt
// @namespace   imatimba
// @match        https://trakt.tv/calendars*
// @match        http://trakt.tv/calendars*
// @grant       none
// @version     1.1
// @author      imatimba
// @description 4/16/2022, 12:33:16 AM
// ==/UserScript==


// XML to JSON utility https://github.com/abdolence/x2js
(function(a,b){if(typeof define==="function"&&define.amd){define([],b);}else{if(typeof exports==="object"){module.exports=b();}else{a.X2JS=b();}}}(this,function(){return function(z){var t="1.2.0";z=z||{};i();u();function i(){if(z.escapeMode===undefined){z.escapeMode=true;}z.attributePrefix=z.attributePrefix||"_";z.arrayAccessForm=z.arrayAccessForm||"none";z.emptyNodeForm=z.emptyNodeForm||"text";if(z.enableToStringFunc===undefined){z.enableToStringFunc=true;}z.arrayAccessFormPaths=z.arrayAccessFormPaths||[];if(z.skipEmptyTextNodesForObj===undefined){z.skipEmptyTextNodesForObj=true;}if(z.stripWhitespaces===undefined){z.stripWhitespaces=true;}z.datetimeAccessFormPaths=z.datetimeAccessFormPaths||[];if(z.useDoubleQuotes===undefined){z.useDoubleQuotes=false;}z.xmlElementsFilter=z.xmlElementsFilter||[];z.jsonPropertiesFilter=z.jsonPropertiesFilter||[];if(z.keepCData===undefined){z.keepCData=false;}}var h={ELEMENT_NODE:1,TEXT_NODE:3,CDATA_SECTION_NODE:4,COMMENT_NODE:8,DOCUMENT_NODE:9};function u(){}function x(B){var C=B.localName;if(C==null){C=B.baseName;}if(C==null||C==""){C=B.nodeName;}return C;}function r(B){return B.prefix;}function s(B){if(typeof(B)=="string"){return B.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");}else{return B;}}function k(B){return B.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/&amp;/g,"&");}function w(C,F,D,E){var B=0;for(;B<C.length;B++){var G=C[B];if(typeof G==="string"){if(G==E){break;}}else{if(G instanceof RegExp){if(G.test(E)){break;}}else{if(typeof G==="function"){if(G(F,D,E)){break;}}}}}return B!=C.length;}function n(D,B,C){switch(z.arrayAccessForm){case"property":if(!(D[B] instanceof Array)){D[B+"_asArray"]=[D[B]];}else{D[B+"_asArray"]=D[B];}break;}if(!(D[B] instanceof Array)&&z.arrayAccessFormPaths.length>0){if(w(z.arrayAccessFormPaths,D,B,C)){D[B]=[D[B]];}}}function a(G){var E=G.split(/[-T:+Z]/g);var F=new Date(E[0],E[1]-1,E[2]);var D=E[5].split(".");F.setHours(E[3],E[4],D[0]);if(D.length>1){F.setMilliseconds(D[1]);}if(E[6]&&E[7]){var C=E[6]*60+Number(E[7]);var B=/\d\d-\d\d:\d\d$/.test(G)?"-":"+";C=0+(B=="-"?-1*C:C);F.setMinutes(F.getMinutes()-C-F.getTimezoneOffset());}else{if(G.indexOf("Z",G.length-1)!==-1){F=new Date(Date.UTC(F.getFullYear(),F.getMonth(),F.getDate(),F.getHours(),F.getMinutes(),F.getSeconds(),F.getMilliseconds()));}}return F;}function q(D,B,C){if(z.datetimeAccessFormPaths.length>0){var E=C.split(".#")[0];if(w(z.datetimeAccessFormPaths,D,B,E)){return a(D);}else{return D;}}else{return D;}}function b(E,C,B,D){if(C==h.ELEMENT_NODE&&z.xmlElementsFilter.length>0){return w(z.xmlElementsFilter,E,B,D);}else{return true;}}function A(D,J){if(D.nodeType==h.DOCUMENT_NODE){var K=new Object;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);if(C.nodeType==h.ELEMENT_NODE){var I=x(C);K[I]=A(C,I);}}return K;}else{if(D.nodeType==h.ELEMENT_NODE){var K=new Object;K.__cnt=0;var B=D.childNodes;for(var L=0;L<B.length;L++){var C=B.item(L);var I=x(C);if(C.nodeType!=h.COMMENT_NODE){var H=J+"."+I;if(b(K,C.nodeType,I,H)){K.__cnt++;if(K[I]==null){K[I]=A(C,H);n(K,I,H);}else{if(K[I]!=null){if(!(K[I] instanceof Array)){K[I]=[K[I]];n(K,I,H);}}(K[I])[K[I].length]=A(C,H);}}}}for(var E=0;E<D.attributes.length;E++){var F=D.attributes.item(E);K.__cnt++;K[z.attributePrefix+F.name]=F.value;}var G=r(D);if(G!=null&&G!=""){K.__cnt++;K.__prefix=G;}if(K["#text"]!=null){K.__text=K["#text"];if(K.__text instanceof Array){K.__text=K.__text.join("\n");}if(z.stripWhitespaces){K.__text=K.__text.trim();}delete K["#text"];if(z.arrayAccessForm=="property"){delete K["#text_asArray"];}K.__text=q(K.__text,I,J+"."+I);}if(K["#cdata-section"]!=null){K.__cdata=K["#cdata-section"];delete K["#cdata-section"];if(z.arrayAccessForm=="property"){delete K["#cdata-section_asArray"];}}if(K.__cnt==0&&z.emptyNodeForm=="text"){K="";}else{if(K.__cnt==1&&K.__text!=null){K=K.__text;}else{if(K.__cnt==1&&K.__cdata!=null&&!z.keepCData){K=K.__cdata;}else{if(K.__cnt>1&&K.__text!=null&&z.skipEmptyTextNodesForObj){if((z.stripWhitespaces&&K.__text=="")||(K.__text.trim()=="")){delete K.__text;}}}}}delete K.__cnt;if(z.enableToStringFunc&&(K.__text!=null||K.__cdata!=null)){K.toString=function(){return(this.__text!=null?this.__text:"")+(this.__cdata!=null?this.__cdata:"");};}return K;}else{if(D.nodeType==h.TEXT_NODE||D.nodeType==h.CDATA_SECTION_NODE){return D.nodeValue;}}}}function o(I,F,H,C){var E="<"+((I!=null&&I.__prefix!=null)?(I.__prefix+":"):"")+F;if(H!=null){for(var G=0;G<H.length;G++){var D=H[G];var B=I[D];if(z.escapeMode){B=s(B);}E+=" "+D.substr(z.attributePrefix.length)+"=";if(z.useDoubleQuotes){E+='"'+B+'"';}else{E+="'"+B+"'";}}}if(!C){E+=">";}else{E+="/>";}return E;}function j(C,B){return"</"+(C.__prefix!=null?(C.__prefix+":"):"")+B+">";}function v(C,B){return C.indexOf(B,C.length-B.length)!==-1;}function y(C,B){if((z.arrayAccessForm=="property"&&v(B.toString(),("_asArray")))||B.toString().indexOf(z.attributePrefix)==0||B.toString().indexOf("__")==0||(C[B] instanceof Function)){return true;}else{return false;}}function m(D){var C=0;if(D instanceof Object){for(var B in D){if(y(D,B)){continue;}C++;}}return C;}function l(D,B,C){return z.jsonPropertiesFilter.length==0||C==""||w(z.jsonPropertiesFilter,D,B,C);}function c(D){var C=[];if(D instanceof Object){for(var B in D){if(B.toString().indexOf("__")==-1&&B.toString().indexOf(z.attributePrefix)==0){C.push(B);}}}return C;}function g(C){var B="";if(C.__cdata!=null){B+="<![CDATA["+C.__cdata+"]]>";}if(C.__text!=null){if(z.escapeMode){B+=s(C.__text);}else{B+=C.__text;}}return B;}function d(C){var B="";if(C instanceof Object){B+=g(C);}else{if(C!=null){if(z.escapeMode){B+=s(C);}else{B+=C;}}}return B;}function p(C,B){if(C===""){return B;}else{return C+"."+B;}}function f(D,G,F,E){var B="";if(D.length==0){B+=o(D,G,F,true);}else{for(var C=0;C<D.length;C++){B+=o(D[C],G,c(D[C]),false);B+=e(D[C],p(E,G));B+=j(D[C],G);}}return B;}function e(I,H){var B="";var F=m(I);if(F>0){for(var E in I){if(y(I,E)||(H!=""&&!l(I,E,p(H,E)))){continue;}var D=I[E];var G=c(D);if(D==null||D==undefined){B+=o(D,E,G,true);}else{if(D instanceof Object){if(D instanceof Array){B+=f(D,E,G,H);}else{if(D instanceof Date){B+=o(D,E,G,false);B+=D.toISOString();B+=j(D,E);}else{var C=m(D);if(C>0||D.__text!=null||D.__cdata!=null){B+=o(D,E,G,false);B+=e(D,p(H,E));B+=j(D,E);}else{B+=o(D,E,G,true);}}}}else{B+=o(D,E,G,false);B+=d(D);B+=j(D,E);}}}}B+=d(I);return B;}this.parseXmlString=function(D){var F=window.ActiveXObject||"ActiveXObject" in window;if(D===undefined){return null;}var E;if(window.DOMParser){var G=new window.DOMParser();var B=null;if(!F){try{B=G.parseFromString("INVALID","text/xml").getElementsByTagName("parsererror")[0].namespaceURI;}catch(C){B=null;}}try{E=G.parseFromString(D,"text/xml");if(B!=null&&E.getElementsByTagNameNS(B,"parsererror").length>0){E=null;}}catch(C){E=null;}}else{if(D.indexOf("<?")==0){D=D.substr(D.indexOf("?>")+2);}E=new ActiveXObject("Microsoft.XMLDOM");E.async="false";E.loadXML(D);}return E;};this.asArray=function(B){if(B===undefined||B==null){return[];}else{if(B instanceof Array){return B;}else{return[B];}}};this.toXmlDateTime=function(B){if(B instanceof Date){return B.toISOString();}else{if(typeof(B)==="number"){return new Date(B).toISOString();}else{return null;}}};this.asDateTime=function(B){if(typeof(B)=="string"){return a(B);}else{return B;}};this.xml2json=function(B){return A(B);};this.xml_str2json=function(B){var C=this.parseXmlString(B);if(C!=null){return this.xml2json(C);}else{return null;}};this.json2xml_str=function(B){return e(B,"");};this.json2xml=function(C){var B=this.json2xml_str(C);return this.parseXmlString(B);};this.getVersion=function(){return t;};};}));

(function initialize() {
    const gridItems = document.querySelectorAll('.grid-item')
    const jpTvNetworks = ["Fuji TV","HTB","Nippon TV","MBS","tv asahi","TV Tokyo","TBS","ANIMAX","AT-X","WOWOW Prime","CBC","NHK BS1","TV Aichi","Gunma TV","NHK G\t","YTV","Nagoya TV","Kids Station","Tokyo MX","NHK Educational TV","Nikkei CNBC","Chiba TV","Teletama","JNN","tvk","Sun TV","TV Osaka","TVQ","BS11","BS-TBS","Tokai Television Broadcasting","Tulip Television","Bandai Channel","All-Nippon News Network","TVh","SKY PerfecTV!","Star Channel","Niconico","KBS Kyoto","BS Fuji","Kansai TV","BS SKY PerfecTV!","GBS","Mie TV","BS Japan","Kyushu Asahi Broadcasting","ABC TV","ABEMA","SBC","BS Asahi","Hulu","Video Pass","Nifty-Serve","FBS","NHK BS2","TV Setouchi","dTV","NET","MTV Japan","Nitteleplus","NHK BS Premium","NHK","Fuji TV NEXT","Dlife","tys","NBC","BSN","Tochigi TV","BeeTV","AnimeFesta","Jumondo","Chukyo TV","RNB","FOD","GyaO!","Toei Tokusatsu Fan Club","Family Gekijo","Yahoo! Dōga","Nippon News Network","Fuji News Network","TXN Network","Hokkaido TV","BS4","Hikari TV","Hikari TV Channel+","BS TV Tokyo","FCT","HBC","Sapporo Television Broadcasting","d Anime Store","RKK Kumamoto Broadcasting","Hokkaido Cultural Broadcasting","Kitanihon Broadcasting","Rakuten TV","Yomiuri Telecasting Corporation","Anime Houdai","Nagasaki Culture Telecasting Corporation","Chubu-Nippon Broadcasting","U-NEXT","Paravi","Nara Television","i-Television","SBS TV\t","TV-U Fukushima","Hokuriku Broadcasting","RSK Sanyo Broadcasting","Oita Broadcasting System","Tulip-TV","TV-U Yamagata","Tohoku Broadcasting","Wakayama Telecasting","Broadcasting System of San-in","Iwate Broadcasting","Fuji TV TWO","NHK BS4K","MONDO TV","Disney Channel","NHK WORLD-JAPAN","RKB","TELASA","OHK","MUSIC ON! TV","Kawaiian TV","TSS","YNN","Kayo Pops Channel","NHKデジタル衛星ハイビジョン","NHK BS8K","ADK","BS12 TwellV","Tsuburaya Imagination","Nihon Eiga","Mainichi Broadcasting System","時代劇専門ch","TV Shizuoka","Anistream"]

    gridItems.forEach(element => {
        const showTraktUrl = element.firstChild.content
        const showName = element.querySelector('div.titles span.hidden meta')?.content
        const tvNetwork = element.querySelector('div.titles h4.generic')?.textContent
        const absoluteEpisode = element.querySelector('span.main-title-abs')?.textContent.match(/\((.*)\)/).pop()
        let isAnime = false

        if (!showTraktUrl) { //handle the VIP ad that takes a grid space
            return 
        } else {
             if (jpTvNetworks.includes(tvNetwork)) {
                isAnime = true
            }
            if (isAnime) {
                getAnime(showName, showTraktUrl, absoluteEpisode)
                    .then(show => {
                        getLink(show, isAnime).then(link => {
                            if (link) {
                                insertHtml(link, element)
                            }
                        })
                    })
            }else {
                const show = getShow(showName, showTraktUrl)
                getLink(show, isAnime).then(link => {
                    if (link) {
                        insertHtml(link, element)
                    }
                })
            }
        }
    })
})();

function getLink(showObj, isAnime) {
  const url = `http://127.0.0.1:9117/api/v2.0/indexers/${isAnime?'nyaasi':'1337x'}/results/torznab/api?q=${showObj.name}${showObj.season === '' ? '':`+S${showObj.season}`}${isAnime?'+':'E'}${showObj.episode}${!isAnime?'+1080':''}${isAnime?'&Category[]=127720':''}&apikey=jf1oooy4hhn2m7yw1t4ihymlik9jcbzi`
  const x2js = new X2JS()
  return fetch(url)
      .then(response => response.text()) // parse response as XML string
      .then(xmlResponse => {
        const jsonResponse = x2js.xml_str2json(xmlResponse)
        const searchResults = jsonResponse.rss.channel.item
        let topSeeders = 0
        let topLink

        if (Array.isArray(searchResults)) {
            searchResults.forEach(obj => {
                if (isAnime && (!obj.title.includes(` ${showObj.episode} `) || obj.title.includes('720' || '480'))) {
                    return
                }
                const seeders = getSeeders(obj)
                let link

                if (isAnime) {
                    link = getAnimeMagnet(obj)
                }else {
                    link = obj.link
                }

                if (seeders > topSeeders) {
                    topSeeders = seeders
                    topLink = link
                }
        })} else if (typeof searchResults === 'object' && searchResults !== null) {
            if (isAnime) {
                if (searchResults.title.includes(` ${showObj.episode} `) && !searchResults.title.includes('720' || '480')) {
                    topLink = getAnimeMagnet(searchResults)
                }                
            }else {
                topLink = searchResults.link
            }
        }

        if (topLink) {
            return topLink
        } else {
            return null
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      })
}

function insertHtml(link, element) {
    const iconHtml = `
    <a class="watch-now" href="${link}">
        <img class="trakt-icon-collection-thick" src="data:image/png;base64, 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"
        alt="Magnet Icon">
    </a>
    `
    element.querySelector('div.quick-icons div.actions').insertAdjacentHTML("beforeend", iconHtml)
}

function getShow(showNameStr, showLink) {
    const showName = showNameStr.replaceAll(' ', '+')
    let showSeason = (showLink.match(/(?<=seasons\/\s*).*?(?=\s*\/episodes)/gs))[0]
    let showEpisode = (showLink.match(/(?<=episodes\/\s*).*?(.*)/gs))[0]

    if (showSeason < 10) {
        showSeason = '0' + showSeason
    }
    if (showEpisode < 10) {
        showEpisode = '0' + showEpisode
    }
    
    const showData = {
        name: showName,
        season: showSeason,
        episode: showEpisode
    }

    return showData
}

function getAnime(showNameStr, showLink, absoluteEpisode) {
    let showName
    let showSeason = (showLink.match(/(?<=seasons\/\s*).*?(?=\s*\/episodes)/gs))[0]
    let showEpisode = (showLink.match(/(?<=episodes\/\s*).*?(.*)/gs))[0]

    const query = `
    query ($search: String) {
        Media (search: $search, type: ANIME) {
          title {
            romaji
          }
       }
    }
    `
    const variables = {
        "search": showNameStr
    }
    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }

    return fetch(url, options)
        .then(response => response.json())
        .then(json => {
            const romaji = cleanRomaji(json.data.Media.title.romaji)
            showName = romaji.replaceAll(' ', '+')
            if (showEpisode < 10) {
                showEpisode = '0' + showEpisode
            }
            if (showSeason == 1) {
                showSeason = ''
            }
            if (absoluteEpisode) {
                showSeason = ''
                showEpisode = absoluteEpisode
            }
            const showData = {
                name: showName,
                season: showSeason,
                episode: showEpisode
            }
        
            return showData
        })
        .catch(err => {
            console.log(`error ${err}`)
        })    
}

function getSeeders(seedObj) {
    let seeders
    seedObj.attr.forEach(attr => {
        if (attr._name === 'seeders')
            seeders = Number(attr._value)
    })
    return seeders
}

function getAnimeMagnet(animeMagnetObj) {
    let link
    animeMagnetObj.attr.forEach(attr => {
        if (attr._name === 'magneturl')
            link = attr._value
    })
    return link
}

function cleanRomaji(romajiStr) {
    const regex = /.+?(?=Part)|.+?(?=Season)|^([^:])+/gs
    return romajiStr.match(regex)[0].trim()
}