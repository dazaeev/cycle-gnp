package com.cycle.service;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cycle.model.Bridge;
import com.cycle.model.Command;
import com.cycle.model.Company;
import com.cycle.model.EmployeeGral;
import com.cycle.model.GcloudJobs;
import com.cycle.model.Gstorage;
import com.cycle.model.MainFrame;
import com.cycle.model.Manuals;
import com.cycle.model.Parameter;
import com.cycle.model.Role;
import com.cycle.model.Send;
import com.cycle.model.User;
import com.cycle.repository.BridgeRepository;
import com.cycle.repository.CommandRepository;
import com.cycle.repository.CompanyRepository;
import com.cycle.repository.CompanySqlRepository;
import com.cycle.repository.EmployeeGralRepository;
import com.cycle.repository.EmployeeRepository;
import com.cycle.repository.GcloudJobsRepository;
import com.cycle.repository.GstorageRepository;
import com.cycle.repository.MainFrameRepository;
import com.cycle.repository.ManualsRepository;
import com.cycle.repository.ParameterRepository;
import com.cycle.repository.RoleRepository;
import com.cycle.repository.SendRepository;
import com.cycle.repository.UserRepository;

import mx.com.buromc.crypto.CryptoUtils;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private ParameterRepository parameterRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private CompanySqlRepository companySqlRepository;
	@Autowired
	private SendRepository sendRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private EmployeeGralRepository employeeGralRepository;
	@Autowired
	private CommandRepository commandRepository;
	@Autowired
	private BridgeRepository bridgeRepository;
	@Autowired
	private ManualsRepository manualsRepository;
	@Autowired
	private GstorageRepository gstorageRepository;
	@Autowired
	private GcloudJobsRepository gcloudJobsRepository;
	@Autowired
	private MainFrameRepository mainFrameRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Value("${local.root.file.system}")
	private String rootFileSystem;
	
	@Value("${local.root.file.system.remove}")
	private boolean rootFileSystemRemove;
	
	@Value("${buro.mc.algorithm}")
	private String algorithm;
	
	@Value("${buro.mc.transformation}")
	private String transformation;
	
	@Value("${gnp.mf.files}")
	private String mfFiles;
	
	@Override
	public Parameter getParameterForId(int id) {
		return parameterRepository.findById(id);
	}

	@Override
	public Parameter getParameterForName(String name) {
		return parameterRepository.findByName(name);
	}
	
	@Override
	public Parameter getParameterNameAndDescription(String name, String description) {
		return parameterRepository.findByNameAndDescription(name, description);
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#getRootFileSystem()
	 */
	@Override
	public String getRootFileSystem() {
		return rootFileSystem;
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#getRootFileSystemRemove()
	 */
	@Override
	public boolean getRootFileSystemRemove() {
		return rootFileSystemRemove;
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#getAlgorithm()
	 */
	@Override
	public String getAlgorithm() {
		return algorithm;
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#getTransformation()
	 */
	@Override
	public String getTransformation() {
		return transformation;
	}
	
	@Override
	public String getMfFiles() {
		return mfFiles;
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#findById(int)
	 */
	@Override
	public User findById(int id) {
		return userRepository.findById(id);
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#saveUser(com.kardex.model.User)
	 */
	@Override
	public void saveUser(User user) {
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		user.setActive(1);
		Role userRole = roleRepository.findByRole("ADMIN");
		user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		userRepository.save(user);
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#findEmployeeAll()
	 */
	@Override
	public List<EmployeeGral> findEmployeeAll() {
		return employeeRepository.findAll();
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#activeUser(int, int)
	 */
	@Override
	public boolean activeUser(int id, int active) throws Exception {
		LOGGER.info("## --> UserServiceImpl.activeUser() ##");
		User user = userRepository.findById(id);
		if(null == user) {
			throw new Exception("Usuario inexistente");
		}
		user.setActive(active);
		LOGGER.info("## <-- UserServiceImpl.activeUser() ##");
		return (null != userRepository.save(user));
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#findUserAll()
	 */
	@Override
	public List<User> findUserAll() {
		return userRepository.findAll();
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#findUserByEmail(java.lang.String)
	 */
	@Override
	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	@Override
	public User findUserById(int id) {
		return userRepository.findById(id);
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#saveUserEmployeeGral(com.kardex.model.User, com.kardex.model.EmployeeGral)
	 */
	@Override
	public void saveUserEmployeeGral(User user, EmployeeGral employeeGral) throws Exception {
		LOGGER.info("## --> UserServiceImpl.saveUserEmployeeGral() ##");
		EmployeeGral employee = employeeGral;
		user.setEmployee(null);
		employeeGral.setUser(user);
		employeeRepository.save(employee);
		LOGGER.info("## <-- UserServiceImpl.saveUserEmployeeGral() ##");
	}

	/* (non-Javadoc)
	 * @see com.kardex.service.UserService#activeEmployeeGral(int, int)
	 */
	@Override
	public boolean activeEmployeeGral(int id, int active) throws Exception {
		LOGGER.info("## --> UserServiceImpl.activeEmployeeGral() ##");
		User user = userRepository.findById(id);
		EmployeeGral employeeGral;
		if(null == user) {
			throw new Exception("Empleado inexistente");
		}
		employeeGral = user.getEmployee();
		employeeGral.setActive(active);
		LOGGER.info("## <-- UserServiceImpl.activeEmployeeGral() ##");
		return (null != employeeGralRepository.save(employeeGral));
	}

	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#saveUserCompany(com.encryp.model.User, java.lang.String)
	 */
	@Override
	public void saveUserCompany(User user, String action) throws Exception{
		LOGGER.info("## --> UserServiceImpl.saveUserCompany() ##");
		// Obtener company
		Company company = user.getCompany();
		if (!user.getPassword().equals("CONFIDENTIAL")) {
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		} else {
			if(action.equals("edit")) {
				user.setPassword(userRepository.findById(user.getId()).getPassword());
			} else {
				user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			}
		}
		user.setActive(1);
		Role userRole = roleRepository.findByRole(user.getRoles().iterator().next().getRole());
		user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
		// Vaciar company para que el usuario sea guardado con exito
		user.setCompany(null);
		// Extraer name y lastname de user
		String []splitNameComplet = user.getName().split("\\ ");
		if(splitNameComplet.length == 2) {
			user.setName(splitNameComplet[0]);
			user.setLastName(splitNameComplet[1]);
		} else if(splitNameComplet.length == 3) {
			user.setName(splitNameComplet[0]);
			user.setLastName(splitNameComplet[1] + " " + splitNameComplet[2]);
		} else if(splitNameComplet.length == 4) {
			user.setName(splitNameComplet[0] + " " + splitNameComplet[1]);
			user.setLastName(splitNameComplet[2] + " " + splitNameComplet[3]);
		} else {
			user.setLastName("N/A");
		}
		if(action.equals("save")) {
			// Guardar Usuario
			userRepository.save(user);
			// Setear usuario a company
			company.setUser(user);
			// Sacar key para encriptado
			SecretKey secretKey = CryptoUtils.generateSecretKey();
			String keyOriginal = new String(secretKey.getEncoded());
			LOGGER.info("IN Llave Maestra: " + keyOriginal);
			String secretKeyBase64 = Base64.getEncoder().encodeToString(secretKey.getEncoded());
			LOGGER.info("Base64: " + secretKeyBase64);
			company.setKeyBase(secretKeyBase64);
			// Guardar company
			companyRepository.save(company);
		} else if (action.equals("edit")) {
			// Guardar Usuario
			userRepository.save(user);
			// Setear usuario a company
			company.setUser(user);
			// Sacar key existente para encriptado
			Company companyOriginal = companySqlRepository.findById(user.getId());
			if(null == companyOriginal) {
				SecretKey secretKey = CryptoUtils.generateSecretKey();
				String keyOriginal = new String(secretKey.getEncoded());
				LOGGER.info("IN Llave Maestra: " + keyOriginal);
				String secretKeyBase64 = Base64.getEncoder().encodeToString(secretKey.getEncoded());
				LOGGER.info("Base64: " + secretKeyBase64);
				company.setKeyBase(secretKeyBase64);
				company.setId(0);
			} else {
				company.setKeyBase(companyOriginal.getKeyBase());
				company.setId(companyOriginal.getId());
			}
			// Guardar company
			companyRepository.save(company);
		} else {
			throw new Exception("Acción no definida.");
		}
		LOGGER.info("## <-- UserServiceImpl.saveUserCompany() ##");
	}

	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#activeUserCompany(int, int)
	 */
	@Override
	public boolean activeUserCompany(int id, int active) throws Exception {
		LOGGER.info("## --> UserServiceImpl.activeUserCompany() ##");
		User user = userRepository.findById(id);
		Company company;
		if(null == user) {
			throw new Exception("Compañia inexistente");
		}
		company = user.getCompany();
		company.setActive(active);
		LOGGER.info("## <-- UserServiceImpl.activeUserCompany() ##");
		return (null != companyRepository.save(company));
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#findSendById(int)
	 */
	@Override
	public Send findSendById(int id) throws Exception {
		return sendRepository.findOne(id);
	}
	
	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#saveUserSend(com.encryp.model.User, com.encryp.model.User)
	 */
	@Override
	public void saveUserSend(User userExists, User user) throws Exception {
		LOGGER.info("## --> UserServiceImpl.saveUserSend() ##");
		Send send = user.getSend();
		send.setId(null == userExists.getSend() ? 0 : userExists.getSend().getId());
		send.setUser(userExists);
		sendRepository.save(send);
		LOGGER.info("## <-- UserServiceImpl.saveUserSend() ##");
	}

	/* (non-Javadoc)
	 * @see com.encryp.service.UserService#activeUserSend(int, int)
	 */
	@Override
	public boolean activeUserSend(int id, int active) throws Exception {
		LOGGER.info("## --> UserServiceImpl.activeUserSend() ##");
		User user = userRepository.findById(id);
		Send send;
		if(null == user) {
			throw new Exception("Compañia inexistente");
		}
		send = user.getSend();
		send.setActive(active);
		LOGGER.info("## <-- UserServiceImpl.activeUserSend() ##");
		return (null != sendRepository.save(send));
	}

	/**
	 *
	 */
	@Override
	public Command findCommandByNameAndEmployeeGral(String name, EmployeeGral employeeGral) {
		return commandRepository.findByNameAndEmployeeGral(name, employeeGral);
	}
	
	@Override
	public List<Bridge> findBridgeByEmployeeGral(EmployeeGral employeeGral) {
		return bridgeRepository.findByEmployeeGral(employeeGral);
	}

	@Override
	public void saveBridge(Bridge bridge) {
		bridgeRepository.save(bridge);
	}
	
	@Override
	public void deleteBridgeInBatch(List<Bridge> bridges) {
		bridgeRepository.deleteInBatch(bridges);
	}
	
	@Override
	public List<Manuals> findManualsByEmployeeGral(EmployeeGral employeeGral) {
		return manualsRepository.findByEmployeeGral(employeeGral);
	}

	@Override
	public void saveManuals(Manuals manuals) {
		manualsRepository.save(manuals);
	}
	
	@Override
	public void deleteManualsInBatch(List<Manuals> manuals) {
		manualsRepository.deleteInBatch(manuals);
	}
	
	@Override
	public List<Gstorage> findByGstorageEmployeeGral(EmployeeGral employeeGral) {
		return gstorageRepository.findByEmployeeGral(employeeGral);
	}

	@Override
	public void saveGstorage(Gstorage gstorage) {
		gstorageRepository.save(gstorage);
	}
	
	@Override
	public void deleteGstorageInBatch(List<Gstorage> gstorages) {
		gstorageRepository.deleteInBatch(gstorages);
	}
	
	@Override
	public GcloudJobs findGcloudJobsByNameJob(String nameJob) {
		return gcloudJobsRepository.findByNameJob(nameJob);
	}

	@Override
	public void saveGcloudJobs(GcloudJobs gcloudJobs) {
		gcloudJobsRepository.save(gcloudJobs);
	}

	@Override
	public MainFrame findMainFrameByFileId(String fileId) {
		return mainFrameRepository.findByFileId(fileId);
	}
	
	@Override
	public MainFrame findMainFrameByFileIdAndAction(String fileId, String action) {
		return mainFrameRepository.findByFileIdAndAction(fileId, action);
	}

	@Override
	public void saveMainFrame(MainFrame mainFrame) {
		mainFrameRepository.save(mainFrame);
	}
}