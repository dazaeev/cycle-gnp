/*
 * @autor Nazario Dazaeev Gonzalez Herrera
 * Controller 
 * Modelo de Datos
 */

function User() {
    this.id = 0;
    this.email = '';
    this.password = '';
    this.name = '';
    this.lastName = '';
    this.active = 1;
    this.roles = [];
    this.employee = null;
    this.company = null;
    this.send = null;
}

function Employee() {
	this.id = 0;
	this.cveEmployee = '';
	this.birthdate = '';
	this.sex = '';
	this.civilStatus = '';
	this.nationality = '';
	this.imss = '';
	this.state = '';
	this.delegationMunicipality = '';
	this.colony = '';
	this.postalCode = '';
	this.streetNumber = '';
	this.militaryPrimer = '';
	this.phone = '';
	this.cellPhone = '';
	this.emergencyPhone = '';
	this.rfc = '';
	this.curp = '';
	this.institute = '';
	this.educationalLevel = '';
	this.statusTitle = '';
	this.nameProofStudies = '';
	this.nameBirthCertificate = '';
	this.nameTitleProfecionalCedula = '';
	this.nameCurp = '';
	this.nameImss = '';
	this.nameInfonavit = '';
	this.nameIdentification = '';
	this.namePassportVisa = '';
	this.nameNoncriminalBackground = '';
	this.nameProofAddress = '';
	this.namePersonalReferences = '';
	this.nameProfessionalCv = '';
	this.namePsychometricTests = '';
	this.namePhoto = '';
	this.jobPlace = null;
	this.boss = '';
	this.salary = '';
	this.user = null;
	// Content File
	this.fileProofStudies = '';
	this.fileBirthCertificate = '';
	this.fileTitleProfecionalCedula = '';
	this.fileCurp = '';
	this.fileImss = '';
	this.fileInfonavit = '';
	this.fileIdentification = '';
	this.filePassportVisa = '';
	this.fileNoncriminalBackground = '';
	this.fileProofAddress = '';
	this.filePersonalReferences = '';
	this.fileProfessionalCv = '';
	this.filePsychometricTests = '';
	this.filePhoto = '';
}

function JobPlace() {
	this.id = 0;
	this.name = '';
	this.description = '';
	this.employees = [];
	this.area = null;
}

function Area() {
	this.id = 0;
	this.name = '';
	this.description = '';
	this.jobPlaces = [];
}

function Role() {
    this.id = 0;
    this.role = '';
}

function Menu() {
	this.id = 0;
	this.roleId = 0;
	this.menu = '';
	this.subMenu = '';
	this.html = '';
	this.roles = [];
}

function employeeGral(){
	this.id = 0;
	this.birthdate = '';
	this.sex = '';
	this.civilStatus = '';
	this.nationality = '';
	this.imss = '';
	this.militaryPrimer = '';
	this.phone = '';
	this.cellPhone = '';
	this.emergencyPhone = '';
	this.rfc = '';
	this.curp = '';
	this.active = '';
	this.user = null;
	this.employeeStudies = null;
	this.employeeDemographics = null;
	this.employeeDemographics = null;
	this.employeeLabor = [];
	this.employeeEconomics = [];
	this.employeeLegal = [];
	this.employeeTraining = [];
	this.employeeFilesSystemPersonal = [];
	this.employeeFilesSystemRh = [];
	
	this.job = [];
}

function employeeStudies(){
	this.id = 0;
	this.universityCollege = '';
	this.educationalLevel = '';
	this.titleStatus = '';
	this.certificationsAviable = '';
	this.expiredCertificates = '';
	this.active = 0;
	this.others = '';
	this.employeeGral = null;
}

function employeeDemographics(){
	this.id							= 0;
	this.streetNumber            	= '';  
	this.colony                  	= '';  
	this.delegationMunicipality  	= '';  
	this.postalCode              	= '';  
	this.state                   	= '';
	this.active             		= '';
	this.employeeGral 				= null;
}

function employeeWorkExperience(){
	this.id							= 0;
	this.employmentA            	= '';  
	this.employmentB               	= '';
	this.employmentC				= '';
	this.active             		= '';
	this.employeeGral 				= null;
}

function employeeLabor(){
	this.id					= 0;
	this.dateAdmission      = '';
	this.area               = '';
	this.marketStall        = '';
	this.jobHistory         = '';
	this.immediateBoss      = '';
	this.holidaysDaysTaken  = '';
	this.holidaysDaysPending= '';
	this.sgmm               = '';
	this.employeeNumber     = '';
	this.email              = '';
	this.active             = '';
	this.employeeGral 		= null;
}

function employeeEconomics(){
	this.id						= 0;
	this.salary					= '';
	this.salaryHistory			= '';
	this.bondHistory			= '';
	this.loanHistory			= '';
	this.discountInfonavit		= '';
	this.foodAllowanceDiscount	= '';
	this.active             	= '';
	this.employeeGral 			= null;
}

function employeeLegal() {
	this.id									= 0;
	this.administrativeActasAttention   	= '';
	this.dischargeDate                  	= '';
	this.reasonLow                      	= '';
	this.passwordGeneratedRrhh          	= '';
	this.trainingPromissoryNotes        	= '';
	this.active								= '';
	this.employeeGral						= null;
	// Content File
	this.fileAdministrativeActasAttention	= '';
}

function employeeFilesSystemPersonal() {
	this.id									= 0;
	this.proofStudies						= '';
	this.birthCertificate                   = '';
	this.titleProfessionalLicense           = '';
	this.curp                               = '';
	this.imss                               = '';
	this.infonavit                          = '';
	this.officialIdentification             = '';
	this.passportVisa                       = '';
	this.noCriminalRecord                   = '';
	this.proofAddress                       = '';
	this.personalReferences                 = '';
	this.professionalCurriculum             = '';
	this.photo                              = '';
	this.certifications                     = '';
	this.active								= '';
	this.employeeGral						= null;
	// Content File
	this.fileProofStudies                   = '';
	this.fileBirthCertificate               = '';
	this.fileTitleProfessionalLicense       = '';
	this.fileCurp                           = '';
	this.fileImss                           = '';
	this.fileInfonavit                      = '';
	this.fileOfficialIdentification         = '';
	this.filePassportVisa                   = '';
	this.fileNoCriminalRecord               = '';
	this.fileProofAddress                   = '';
	this.filePersonalReferences             = '';
	this.fileProfessionalCurriculum         = '';
	this.filePhoto                          = '';
	this.fileCertifications                 = '';
}

function company() {
	this.id			= 0;
	this.name       = '';
	this.address    = '';
	this.key		= '';
	this.active     = '';
	this.user = null;
}

function send() {
	this.id					= 0;
	this.username       	= '';
	this.password       	= '';
	this.serverAddress		= '';
	this.serverPort			= '';
	this.destinationPath	= '';
	this.originPath			= '';
	this.chanel				= '';
	this.active				= '';
	this.user = null;
}

function job(){
	this.id 				= 0;
	this.name 				= '';
	this.command			= '';
	this.quartzStart		= '';
	this.quartzEnd			= '';
	this.active 			= 0;
	this.employeeGral 		= null;
}