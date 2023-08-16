package com.example.fullCRUD.user;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import com.example.fullCRUD.company.Company;
import com.example.fullCRUD.draft.Draft;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "app_user")
public class AppUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long appUserId;

	@Column(nullable = false, unique = true, length = 30)
	private String username;

	@Column(nullable = false, length = 64)
	private String password;

	@Column(name = "first_name", nullable = false, length = 20)
	private String firstName;

	@Column(name = "last_name", nullable = false, length = 20)
	private String lastName;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "reset_password_token", nullable = true)
	private String resetPasswordToken;

	@Column(name = "company_id")
	private @Getter @Setter Long company_id;

	// getters and setters

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id", insertable = false, updatable = false)
	private @Getter @Setter Company company;


	public String getResetPasswordToken() {
		return resetPasswordToken;
	}

	public void setResetPasswordToken(String resetPasswordToken) {
		this.resetPasswordToken = resetPasswordToken;
	}



	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id")
	private List<Draft> draftList;

	public List<Draft> getDraftList() {
		return draftList;
	}

	public void setDraftList(List<Draft> draftList) {
		this.draftList = draftList;
	}

	public String getFullName() {
		return this.getFirstName() + " " + this.getLastName();
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public void addRole(Role role) {
		this.roles.add(role);
	}

	public AppUser() {

	}

	protected AppUser(String username, String password, String firstName, String lastName) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public Long getAppUserId() {
		return appUserId;
	}

	public void setAppUserId(Long appUserId) {
		this.appUserId = appUserId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

}
