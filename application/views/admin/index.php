<div class="container" style="">
	<div class="row">
		
		<div class="lennin"></div>
		<?php $this->load->view('admin/includes/menu-admin'); ?>

		<div class="col-md-2 col-md-offset-1 visible-lg visible-md affix">
			
				<div id="nav-ejemplo">
					<ul class="nav nav-stacked">
						<?php $this->load->view('admin/includes/menu-form'); ?>
					</ul>
				</div>
			
		</div>

		<div class="col-md-2 visible-xs visible-sm">
			<div >
				<ul class="nav nav-stacked">
					<?php $this->load->view('admin/includes/menu-form'); ?>
				</ul>
			</div>
		</div>

		<div class="col-md-8 col-md-offset-3">

			<div class="row">
				<div class="col-md-11 col-md-offset-1">
					
					<?php $this->load->view('admin/includes/select-institucion');?>
			
					<div class="" id="forms-registro">

						<div class="row  col-md-offset-1 margen1" id="estudiante">
							<?php $this->load->view('admin/includes/forms/form-estudiantes');?>
						</div>

						<div class="row  col-md-offset-1 margen1" id="profesor">
							<?php $this->load->view('admin/includes/forms/form-profesor');?>
						</div>

						<?php $this->load->view('admin/includes/forms/form-materia');?>

						<?php $this->load->view('admin/includes/forms/form-curso');?>

						<?php $this->load->view('admin/includes/forms/form-clase');?>
					</div>

				</div>

			</div>
		</div>
		
	</div>
</div>