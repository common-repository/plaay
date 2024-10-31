<div id="popup_container" style="display:none;">
	
	<div id="form-embed">
		<h2>Incorporar listas automáticas</h2>
		<ul class="list" id="radio-list">
			<li>
				<input type="radio" id="radio-music" name="list_option"  />
				<label for="radio-music">Música</label>
			</li>
			<li>
				<input type="radio" id="radio-artist" name="list_option"  />
				<label for="radio-artist">Artista</label>
			</li>
			<li>
				<input type="radio" id="radio-album" name="list_option"  />
				<label for="radio-album">Album</label>
			</li>
			<li>
				<span></span>
			</li>
		</ul>
		<input type="text" name="keyword_list" id="keyword-list" placeholder="ex: Will.I.Am" />
		<a href="#" class="button button-primary button-large" id="find-lists">Buscar</a>
		<hr />
		
		<h2>Incorporar playlist customizada</h2>
		<input type="text" id="playlist-link" placeholder="ex: http://www.plaay.com.br/plaayfm/88478/500-dias-com-ela-trilha-sonora/" />
		<a href="http://www.plaay.com.br" class="button button-primary button-large" target="_blank">Criar Nova Playlist</a>
		<a href="#" class="button button-primary button-large no-margin" id="incorporate-playlist">Incorporar</a>
		<hr />
		
		<h2>Preview</h2>
		<ul class="list">
			<li>
				<label>Largura</label>
				<input type="text" id="width" value="600" />
			</li>
			<li>
				<label>Altura</label>
				<input type="text" id="height" placeholder="352" disabled />
			</li>
		</ul>
		<a href="#" class="button button-primary button-large" id="update-size">Atualizar Tamanho</a>
		
		<div id="result"></div>
		
		<div id="final-buttons">
			<a href="#" class="button button-primary button-large" id="insert-post">Inserir no Post</a>
			<a href="#" class="button button-primary button-large no-margin" id="cancel">Cancelar</a>
		</div>
	</div>
</div>