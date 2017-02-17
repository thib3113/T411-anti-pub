// ==UserScript==
// @name         T411 anti pub
// @version      0.1
// @description  Fait fonctionner le bouton de téléchargement si vous utilisez un bloqueur de pub
// @author       Thibaut SEVERAC
// @include *.t411.li/*
// @run-at document-end
// @namespace https://greasyfork.org/users/33719
// ==/UserScript==

(function() {
    'use strict';

    // search hiden download link
    var link = jQuery(".banner-adv.banner-300 a");
    if(link.length === 0){
        console.error("Impossible de trouver le lien de téléchargement dans la page");
    }
    else{
        var no_pub_link = link.parent("div").siblings("div").children("a:first");
        if(no_pub_link.length === 0)
            console.error("Impossible de trouver le lien sans pub");
        else{
           no_pub_link.off("click");
           no_pub_link.get(0).onclick = function(){
               var iframe = document.createElement("IFRAME");
               iframe.src=this.link;
               jQuery("body").append(iframe);
               event.stopPropagation();
               event.preventDefault();
           }.bind({link:link.attr("href")});
        }
    }
})();