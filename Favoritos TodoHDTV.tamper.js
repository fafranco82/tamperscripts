// ==UserScript==
// @name       Favoritos TodoHDTV
// @namespace  http://www.frikinet.com/todohdtv
// @version    0.1
// @description  Coloca en la página de favoritos de HDTV cual es el ultimo episodio bajado
// @match      http://foro.todohdtv.com/ucp.php?i=main&mode=bookmarks
// @requires   http://code.jquery.com/jquery-1.10.1.min.js
// @copyright  2012+, You
// ==/UserScript==

$('a.topictitle').each(function() {
	var idTopic = /topic(\d+)\.html/ig.exec($(this).attr('href'))[1];
	var chapter = parseInt(/\[(\d+)\//ig.exec($(this).text())[1], 10);
	var key = 'chapter_'+idTopic;
    var lastChapter = GM_getValue(key, 0);
    if(lastChapter < chapter) {
        $('<a/>').addClass('topictitle').css({
            cursor: 'pointer',
            marginRight: '1em'
        }).text('(NEW - '+lastChapter+')  ').click(function(e) {
        	e.preventDefault();
            GM_setValue(key, chapter);
            $(this).remove();
        }).insertBefore(this);
    }
});