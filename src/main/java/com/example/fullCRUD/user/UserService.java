package com.example.fullCRUD.user;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

	@Autowired
	private AppUserRepository appUserRepository;

	@Autowired
	private RoleRepository roleRepository;

	// register new user with basic role USER
	public void saveUserWithDefaultRole(AppUser user, Long companyID) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);

//		Role roleUser = roleRepository.findByName("USER");
//		user.addRole(roleUser);

		System.out.println(user.getRoles());

		user.setCompany_id(companyID);

		appUserRepository.save(user);

	}

	public List<AppUser> findAllByRole(String roleName) {
		return appUserRepository.findByRoleName(roleName);
	}

	public List<AppUser> findAllByRoleAndCompany(String roleName, Long companyID) {
		return appUserRepository.findByRoleNameAndCompanyId(roleName, companyID);
	}

	public String checkUser(AppUser user, Long companyID) {
		String regex = "^[\\w!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&amp;'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$";
		Pattern pattern = Pattern.compile(regex);
		Matcher matcher = pattern.matcher(user.getEmail());
		List<AppUser> listUser = listAll();
		for (AppUser u : listUser) {
			if (user.getUsername().equals(u.getUsername())) {
				return "Username Taken!";
			} else if (user.getUsername().length() < 6) {
				return "Username should be at least 6 characters!";
			}
			else if (user.getUsername().length() > 20) {
				return "Username should not be over 20 characters!";
			}
			else if (user.getPassword().length() < 6) {
				return "Password should be at least 6 characters!";
			}
			else if (user.getEmail().equals(u.getEmail())) {
				return "This Email has been used!";
			} else if (!matcher.matches()) {
				return "Invalid Email Format!";
			}
		}
		saveUserWithDefaultRole(user, companyID);
		return "Signing Up Succeed";
	}

	public void save(AppUser user) {
		AppUser user1 = appUserRepository.findByUsername(user.getUsername());
		user1.setRoles(user.getRoles());
		appUserRepository.save(user1);
	}

	public void saveCompany(AppUser user) {
		AppUser user1 = appUserRepository.findByUsername(user.getUsername());
		user1.setCompany(user.getCompany());
		user1.setCompany_id(user.getCompany_id());
		appUserRepository.save(user1);
	}

	// Get a list of users
	public List<AppUser> listAll() {
		return appUserRepository.findAll();
	}

	// Get user based on id
	public AppUser get(Long id) {
		return appUserRepository.findById(id).get();
	}

	// List roles
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}

	public List<Role> getRolesCompany() {
		List<Role> roles =  roleRepository.findAll();
		List<Role> user_roles = new ArrayList<>();
		for (Role role : roles) {
			if (role.getName().equals("PRODUCTION_MANAGER") || role.getName().equals("USER") || role.getName().equals("ACCOUNT")) {
				user_roles.add(role);
			}
		}
		return user_roles;
	}

	// reset password
	public void updateResetPasswordToken(String token, String email) throws UsernameNotFoundException {
		AppUser customer = appUserRepository.findByEmail(email);
		if (customer != null) {
			customer.setResetPasswordToken(token);
			appUserRepository.save(customer);
		} else {
			throw new UsernameNotFoundException("Could not find any user with the email " + email);
		}
	}

	public AppUser getByResetPasswordToken(String token) {
		return appUserRepository.findByResetPasswordToken(token);
	}

	public void updatePassword(AppUser customer, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		customer.setPassword(encodedPassword);

		customer.setResetPasswordToken(null);
		appUserRepository.save(customer);
	}
}
