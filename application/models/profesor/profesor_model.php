<?php 

class Profesor_model extends CI_model
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->database();
	}


	function verificarKey($tabla, $indiceYkey)
	{	
		$query = $this->db->get_where($tabla, $indiceYkey);

		$row = $query->num_rows();
		//$row = $query->result_array();
		return $row;
		// echo '<pre>'; echo $row; echo '</pre>';

	}

	function getClasesFromProfesor($Profesor_Identificacion)
	{
		$this->db->join('Materia', 'Materia.id = Clase.Materia_id');
		$this->db->join('Curso', 'Curso.codigo = Clase.Curso_codigo');

		$data = array('Profesor_Identificacion' => $Profesor_Identificacion );
		$query = $this->db->get_where('Clase', $data);
		$row = $query->result_array();
		return $row;
	}

	function getAsistencia2($numeroClase, $fecha)
	{
		$query = $this->db->query("SELECT * FROM Asistencia
			where cast(datetime_log  as date) = '$fecha' 
			and Clase_numero = '$numeroClase'");

		if ($query) {
			return $query->result_array();
		}
		
	}

	function getAsistencia($numeroClase, $fecha)
	{
		$query = $this->db->query("SELECT numero as claseID, Materia_id as materiaID, Profesor_identificacion, Clase.Curso_codigo, 
		Matricula.Estudiante_identificacion, nombre, apellido, Asistencia.id as AsistenciaID, Asistencia, datetime_log, Observacion
		 FROM Clase
			join Matricula
			on Clase.Curso_codigo = Matricula.Curso_codigo
			
			left join Asistencia
			on Asistencia.Clase_numero = Clase.numero 
			and Matricula.Estudiante_identificacion = Asistencia.Estudiante_identificacion
			and cast(fecha as date) = '$fecha'
			
			join (SELECT identificacion, nombre, apellido FROM Estudiante
					join Usuario
					on Usuario.id = Estudiante.Usuario_id) as EstudianteInfo
			on EstudianteInfo.identificacion = Matricula.Estudiante_identificacion
		where Clase.numero = '$numeroClase'	order by nombre, apellido");

		if ($query) {
			return $query->result_array();
		}
		
	}

	function setAsistenciaModel($data)
	{
		$this->db->insert('Asistencia', $data); 
	}

	function upd8AsistenciaModel($datafiltro, $data)
	{

		$this->db->where($datafiltro);
		$this->db->update('Asistencia', $data); 
	}

	


}

 ?>