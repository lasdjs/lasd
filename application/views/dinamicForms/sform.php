<div class="container-fluid">
	
	<div class="page-header">
		<h2>Formulario Estático</h2>
	</div>

	<?php echo validation_errors(); ?>

	<?php echo form_open('formularios/sform') ?>
		
		<!-- falta la clase y la id del formulario -->
		<label>Nombre del formulario: </label> 
		<input type="text" id="FormName" name="FormName" value="" required/>
		
		<div class="control-group">
			<label for="name" >name: </label>
			<input type="text" id="name" name="name" value="" required/>

			<label for="class" >class: </label>
			<input type="text" id="class" name="class" value="" />

			<label for="id" >Id: </label>
			<input type="text" id="id" name="id" value="" />

			<label for="value" >value: </label>
			<input type="text" id="value" name="value" value="" />
			
			<label for="placeholder" >placeholder: </label>
			<input type="text" id="placeholder" name="placeholder" value="" />
		</div>
		<button class="btn btn-primary" type="submit"><i class=" icon-ok icon-white"></i> Crear formulario Dinámico</button>
	</form>

	<p><?php echo anchor('formularios/dform', 'dForm', 'class="btn btn-warning"'); ?></p>
</div>

