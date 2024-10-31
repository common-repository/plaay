/************************************
*	Plugin Name: Plaay				*
*	Author: Gustavo Sales			*
*************************************/

var $ = jQuery;

this.plugin = new function(){
    this.initialize = function(){
        var self = this;
        $('#incorporate-playlist').click(this.incorporatePlaylistUrl);
        $('#update-size').click(this.updateSize);
        $('#width').keyup(function(){
            $(this).val(self.verifyNumber($(this).val()));
        });
        if (typeof $('body').on != 'undefined'){
            $('body').on('click', '#result li', this.incorporatePlaylistId);
        }
        else {
            $('#result li').live('click', this.incorporatePlaylistId);
        }
        $('#insert-post').click(this.writeEmbed);
        $('#cancel').click(this.closePopup);
        $('#find-lists').click(this.findLists);
    },
    this.incorporatePlaylistUrl = function(){
        var url = $.trim($('#playlist-link').val());
        var width = $.trim($('#width').val());
        var height = $.trim($('#height').val());

        if(url == '' || url.indexOf('plaay.com.br') == -1){
            $('#playlist-link').val('').attr('placeholder', 'Cole uma url aqui, ex: http://www.plaay.com.br/plaayfm/88478/500-dias-com-ela-trilha-sonora/');
            return false;
        }

        if(url.indexOf('http') == -1)
            url = 'http://' + url

        if(url.indexOf('/embed/') == -1){
            var id = url.split('/')[4];
            var type;
            var rePlaylist = new RegExp(/http:\/\/www.plaay.com.br\/[\S]+\/[\d]+\/[\S]+\/$/);
            var reAlbum = new RegExp(/http:\/\/www.plaay.com.br\/artist\/[\d]+\/+[\S]+\/[\S]+\/[\d]+\/$/);

            if(url.split('/')[3] == 'music')
                type = 'music';
            else if(url.split('/')[3] == 'artist' && !reAlbum.test(url))
                type = 'artist';
            else if(reAlbum.test(url)){
                id = url.split('/')[7]
                type = 'album';
            }
            else if(rePlaylist.test(url))
                type = 'playlist';

            url = 'http://www.plaay.com.br/embed/' + type + '/' + id;
        }

        $('#result').addClass('loading');

        $('#result').removeClass('loading').html(
            '<iframe src="' + url + '" width="' + width + '" height="357" frameborder="0"></iframe>'
            );

        return false;
    },
    this.incorporatePlaylistId = function () {
        var type = $('#result ul').attr('type');
        var id = $(this).attr('id');
        var width = $.trim($('#width').val());
        var height = $.trim($('#height').val());
        var url = 'http://www.plaay.com.br/embed/' + type + '/' + id;

        $('#result').addClass('loading');

        $('#result').removeClass('loading').html(
            '<iframe src="' + url + '" width="' + width + '" height="357" frameborder="0"></iframe>'
            );
    },
    this.updateSize = function(){
        if($('#result').find('iframe').length == 0)
            return false;

        var url = $('#result iframe').attr('src');
        var width = $.trim($('#width').val());

        $('#result').addClass('loading');

        $('#result').removeClass('loading').html(
            '<iframe src="' + url + '" width="' + width + '" height="357" frameborder="0"></iframe>'
            );

        return false;
    },
    this.writeEmbed = function () {
        if($('#result').find('iframe').length == 0)
            return false;
		
        if( tinyMCE.activeEditor == null) {
            $('#content').val($('#content').val() + $('#result').html());
        } else {
            var editor = tinyMCE.activeEditor;
            editor.setContent(editor.getContent() + $('#result').html());    
        }
		
        parent.$("#TB_closeWindowButton").click();

        return false;
    },
    this.closePopup = function () {
        parent.$("#TB_closeWindowButton").click();
    },
    this.verifyNumber = function(expression){
        return expression.replace(/\D/g, ''); 
    },
    this.findLists = function(){
        var keyword = $.trim($('#keyword-list').val());
        var type;
        var isChecked = false;
        var self = $(this);

        for(var i = 0; i < $('#radio-list li').length - 1; i++){
            if($('#radio-list li').eq(i).find('input').is(':checked')){
                $('#radio-list li').last().find('span').html('');
                type = $('#radio-list li').eq(i).find('input').attr('id').split('-')[1].toLowerCase();
                isChecked = true;
                break;
            }
        }

        if(!isChecked){
            $('#radio-list li').last().find('span').html('Escolha uma das opções ao lado');
            return false;
        }

        if(type != 'music' && type != 'artist' && type != 'album'){
            $('#radio-list li').last().find('span').html('Tipo não encontrado');
            return false;
        }

        if(keyword == ''){
            $('#keyword-list').val('').attr('placeholder', 'Digite uma palavra chave aqui, ex: Oficina G3');
            return false;
        }

        $('#result').html('').addClass('loading');
                
        var url = $('#style-css').attr('href').split('/');
        var urlStr = '';
        
        for(var i = 3; i < url.length - 1; i++)
            if(url[i] != 'css')
                urlStr += url[i] + '/';
            else
                break;
        
        url = '/'  + urlStr;
        
        var urlSearch;
        var curlEnabled;
        $.ajax({
            type: 'GET',
            url: url + 'verify-curl.php',
            success: function(data){
                curlEnabled = data;
                if(parseInt(curlEnabled))
                    urlSearch = url + 'search.php';
                else
                    urlSearch = 'http://www.plaay.com.br/api/webpage_search';
                
                
                $.ajax({
                    type: 'POST',
                    url: urlSearch,
                    data: {
                        api_key: 'adskjnbka1_adsbado19129',
                        auth_key: '-',
                        search: keyword, 
                        search_type: type,
                        embed: true
                    },
                    success: function(data){
                        if(curlEnabled)
                            data = $.parseJSON(data);
                        
                        var html = '<ul id="return-search" type="' + data.results[0]['type'] + '">';
                        switch(data.results[0]['type']){
                            case 'music':
                                data = data.results[0]['songs'];
                                if (data.length == 0)
                                    html = 'Nenhum resultado encontrado.';
                                else {
                                    $.each(data, function (i, value) {
                                        html += '<li id="' + value.id + '">' +
                                        '<div class="hover"></div>' +
                                        '<img src="' + value.coverphoto_large_url + '" alt="' + value.artist + ' - ' + value.name + '">' +
                                        '<div>' +
                                        value.name + '<br />' +
                                        '<small>' + value.artist + '</small>' +
                                        '<div>' +
                                        '</li>'
                                    });
                                }
                                break;
                            case 'artist':
                                data = data.results[0]['artists'];
                                if (data.length == 0)
                                    html = 'Nenhum resultado encontrado.';
                                else {
                                    $.each(data, function (i, value) {
                                        html += '<li id="' + value['Artist'].id + '">' +
                                        '<div class="hover"></div>' +
                                        '<img src="' + value['Artist'].coverphoto_large_url + '" alt="' + value['Artist'].artist + '">' +
                                        '<div>' +
                                        value['Artist'].artist +
                                        '<div>' +
                                        '</li>'
                                    });
                                }
                                break;
                            case 'album':
                                data = data.results[0]['albums'];
                                if (data.length == 0)
                                    html = 'Nenhum resultado encontrado.';
                                else {
                                    $.each(data, function (i, value) {
                                        html += '<li id="' + value.id + '">' +
                                        '<div class="hover"></div>' +
                                        '<img src="' + value.coverphoto_large_url + '" alt="' + value.artist + ' - ' + value.album + '">' +
                                        '<div>' +
                                        value.album + '<br />' +
                                        '<small>' + value.artist + '</small>' +
                                        '<div>' +
                                        '</li>'
                                    });
                                }
                                break;
                        }

                        if (html != 'Nenhum resultado encontrado.')
                            html += '</ul>';

                        $('#result', window.parent.document).removeClass('loading').html(html);

                    },
                    error: function(xhr, msg){
                        console.log(msg);
                    }
                });
            }
        });

        return false;
    }
}