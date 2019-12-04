/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Pagina de consulta Empleados todos
 */

// Cargando sistema
$(document).ready(function($) {
	startingSystemMenu();
	// Llenar tabla empleados
	sendPostAction(EMPLOYEE_ALL_CONTROLLER + 'findEmployeeAll', null, respFindAll);
});

function respFindAll(data){
	// $('body').toggleClass('open');
	if(data){
		var tableEmployee =	  ' <table id="bootstrap-data-table"				'
							+ ' 	class="table mb-0 table-striped">			'
							+ ' <thead>                                         '
							+ ' 	<tr>                                        '
							
							+ ' 		<th>Clave													</th>                          '
							+ ' 		<th>Nombre													</th>                          '
							+ ' 		<th>Apellidos												</th>                          '
							
							+ ' 		<th>Fecha Nacimiento										</th>                          '
							+ ' 		<th>Sexo					                                </th>                          '
							+ ' 		<th>Estado Civil			                                </th>                          '
							+ ' 		<th>Nacionalidad			                                </th>                          '
							+ ' 		<th>NSS						                                </th>                          '
							+ ' 		<th>Cartilla Militar		                                </th>                          '
							+ ' 		<th>Telefono Casa			                                </th>                          '
							+ ' 		<th>Telefono Celular		                                </th>                          '
							+ ' 		<th>Telefono Emergencia										</th>                          '
							+ ' 		<th>RFC						                                </th>                          '
							+ ' 		<th>CURP					                                </th>                          '
							+ ' 		<th>Escuela						                           	</th>                          '
							+ ' 		<th>Nivel Estudios											</th>                          '
							+ ' 		<th>Estatus Titulo											</th>                          '
							+ ' 		<th>Certificaciones Vigentes                                </th>                          '
							+ ' 		<th>Certificaciones Vencidas                                </th>                          '
							+ ' 		<th>Otros                                                   </th>                          '
							+ ' 		<th>Calle Numero			                                </th>                          '
							+ ' 		<th>Colonia    				                                </th>                          '
							+ ' 		<th>Delegacion Municipio									</th>                          '
							+ ' 		<th>Codigo Postal    		                                </th>                          '
							+ ' 		<th>Estado    				                                </th>                          '
							+ ' 		<th>1er Empleo                                              </th>                          '
							+ ' 		<th>2do Empleo                                              </th>                          '
							+ ' 		<th>3er Empleo                                              </th>                          '
							+ ' 		<th>Fecha Ingreso											</th>                          '
							+ ' 		<th>Area                                                    </th>                          '
							+ ' 		<th>Puesto                                                  </th>                          '
							+ ' 		<th>Historial Puesto										</th>                          '
							+ ' 		<th>Jefe Inmediato                                          </th>                          '
							+ ' 		<th>Vacaciones Tomados(dias)                           		</th>                          '
							+ ' 		<th>Vacaciones Pendientes(dias)	                        	</th>                          '
							+ ' 		<th>SGMM #Poliza											</th>                          '
							+ ' 		<th>Numero Empleado											</th>                          '
							+ ' 		<th>Email                                                   </th>                          '
							+ ' 		<th>Salario							                        </th>                          '
							+ ' 		<th>Historial Salario										</th>                          '
							+ ' 		<th>Historial Bonos											</th>                          '
							+ ' 		<th>Historial Prestamos										</th>                          '
							+ ' 		<th>Descuento Infonavit                                     </th>                          '
							+ ' 		<th>Pensión Alimenticia                           			</th>                          '
							+ ' 		<th>Actas Administrativas									</th>                          '
							+ ' 		<th>Fecha Baja												</th>                          '
							+ ' 		<th>Motivo Baja												</th>                          '
							+ ' 		<th>Password RRHH											</th>                          '
							+ ' 		<th>Pagares Capacitación									</th>                          '
							+ ' 		<th>Competencias Blandas	                                </th>                          '
							+ ' 		<th>Competencias Técnicas                                   </th>                          '
							+ ' 		<th>Conferencias Otros										</th>                          '
							+ ' 		<th>Archivo Estudios					                    </th>                          '
							+ ' 		<th>Archivo Nacimiento                             			</th>                          '
							+ ' 		<th>Archivo Titulo/Cedula									</th>                          '
							+ ' 		<th>Archivo CURP                                            </th>                          '
							+ ' 		<th>Archivo IMSS                                            </th>                          '
							+ ' 		<th>Archivo Infonavit                                       </th>                          '
							+ ' 		<th>Archivo Identificación                                  </th>                          '
							+ ' 		<th>Archivo Pasaporte/Visa									</th>                          '
							+ ' 		<th>Archivo Antecedentes/NoPenales							</th>                          '
							+ ' 		<th>Archivo Domicilio                           			</th>                          '
							+ ' 		<th>Archivo RefPersonales                          			</th>                          '
							+ ' 		<th>Archivo CV												</th>                          '
							+ ' 		<th>Archivo Foto                                            </th>                          '
							+ ' 		<th>Archivo Certificaciones                                 </th>                          '
							+ ' 		<th>Archivo Actas Administrativas							</th>                          '
							+ ' 		<th>Archivo ContratoLaboral			                   		</th>                          '
							+ ' 		<th>Archivo PropuestaTrabajo								</th>                          '
							+ ' 		<th>Archivo PlanCarrera										</th>                          '
							+ ' 		<th>Archivo PruebasPicometricas                           	</th>                          '
							+ ' 		<th>Archivo Vacaciones                                      </th>                          '
							+ ' 		<th>Archivo Permisos                                        </th>                          '
							+ ' 		<th>Archivo Inv.SocioEconomica								</th>                          '
							+ ' 		<th>Archivo ExamTécnicosInternos                       		</th>                          '
							+ ' 		<th>Archivo ResEvalDesempeño								</th>                          '
							+ ' 		<th>Archivo CurriculoEmpresarial                           	</th>                          '
							+ ' 		<th>Archivo Capacitación									</th>                          '
							+ ' 		<th>Archivo Finiquito                                       </th>                          '
							
							+ ' 	</tr>                                       '
							+ ' </thead>                                        '
							+ ' <tbody>                                         ';
		for (var i = 0; i < data.length; i++){
			var rowEmployee = data[i];
			var tr = '<tr id="employee_' + rowEmployee.id + '">';
			tr += '<td>'+ rowEmployee.id +'</td>';
			tr += '<td>'+ rowEmployee.name +'</td>';
			tr += '<td>'+ rowEmployee.lastName +'</td>';
			
			tr += '<td class="table-active">'+ rowEmployee.birthdate					 +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.sex                           +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.civilStatus                   +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.nationality                   +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.imss                          +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.militaryPrimer                +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.phone                         +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.cellPhone                     +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.emergencyPhone                +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.rfc                           +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.curp                          +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.universityCollege            +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.educationalLevel             +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.titleStatus                  +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.certificationsAviable        +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.expiredCertificates          +'</td>';
			tr += '<td class="table-primary">'+ rowEmployee.others                       +'</td>';
			tr += '<td class="table-secondary">'+ rowEmployee.streetNumber               +'</td>';
			tr += '<td class="table-secondary">'+ rowEmployee.colony                     +'</td>';
			tr += '<td class="table-secondary">'+ rowEmployee.delegationMunicipality     +'</td>';
			tr += '<td class="table-secondary">'+ rowEmployee.postalCode                 +'</td>';
			tr += '<td class="table-secondary">'+ rowEmployee.state                      +'</td>';
			tr += '<td class="table-success">'+ rowEmployee.employmentA                  +'</td>';
			tr += '<td class="table-success">'+ rowEmployee.employmentB                  +'</td>';
			tr += '<td class="table-success">'+ rowEmployee.employmentC                  +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.dateAdmission                 +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.area                          +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.marketStall                   +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.jobHistory                    +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.immediateBoss                 +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.holidaysDaysTaken             +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.holidaysDaysPending           +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.sgmm                          +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.employeeNumber                +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.email                         +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.salary                       +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.salaryHistory                +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.bondHistory                  +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.loanHistory                  +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.discountInfonavit            +'</td>';
			tr += '<td class="table-warning">'+ rowEmployee.foodAllowanceDiscount        +'</td>';
			tr += '<td class="table-info">'+ rowEmployee.administrativeActasAttention  	 +'</td>';
			tr += '<td class="table-info">'+ rowEmployee.dischargeDate                   +'</td>';
			tr += '<td class="table-info">'+ rowEmployee.reasonLow                       +'</td>';
			tr += '<td class="table-info">'+ rowEmployee.passwordGeneratedRrhh           +'</td>';
			tr += '<td class="table-info">'+ rowEmployee.trainingPromissoryNotes         +'</td>';
			tr += '<td>'+ rowEmployee.softCompetitions              					 +'</td>';
			tr += '<td>'+ rowEmployee.technicalSkills               					 +'</td>';
			tr += '<td>'+ rowEmployee.otherExposConferences         					 +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.proofStudies                  +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.birthCertificate              +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.titleProfessionalLicense      +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.fcurp                         +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.fimss                         +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.infonavit                     +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.officialIdentification        +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.passportVisa                  +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.noCriminalRecord              +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.proofAddress                  +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.personalReferences            +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.professionalCurriculum        +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.photo                         +'</td>';
			tr += '<td class="table-active">'+ rowEmployee.certifications                +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.administrativeAttention       +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.employmentContract            +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.workProposal                  +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.careerPlanSigned              +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.psychometricTest              +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.holidays                      +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.permits                       +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.socioEconomicResearch         +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.internalTechnicalExams        +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.performanceEvaluationResults  +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.businessCurriculum            +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.training                      +'</td>';
			tr += '<td class="table-danger">'+ rowEmployee.settlement                    +'</td>';
			
			tr += '</tr>';
			tableEmployee += tr;
		}
		tableEmployee += '</tbody>'
						+ ' </table>';
	}
	
	var wrapper = $("#seccion-table-employee");
	$(wrapper).append(tableEmployee); // add html
	//
	exportTable('bootstrap-data-table', 
			[
				{extend: 'excelHtml5', text: '<i class="fa fa-file-excel-o" style="font-size:20px;color:green"></i>', titleAttr: 'Exportar a Excel'}
			]);
	reloadTable('bootstrap-data-table');
}