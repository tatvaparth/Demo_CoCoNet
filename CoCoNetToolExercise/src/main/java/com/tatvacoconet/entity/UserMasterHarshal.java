package com.tatvacoconet.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * @author TatvaSoft
 *
 */
@Entity
@Table(name="user_harshal")
public class UserMasterHarshal {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "user_id")
	private int id;
	
	@Column(name = "user_fullname")
	private String fullname;
	
	@Column(name = "user_password")
	private String password;
	
	@Column(name = "user_email")
	private String email;
	
	@Column(name = "user_gender")
	private boolean gender;
	
	@Column(name = "user_hobby")
	private String hooby;
	
	@Column(name = "user_city")
	private String city;
	
	@Column(name = "user_address")
	private String address;
	
	@Column(name = "user_dateofbirth")
	private Date dateofbirth;
	
	@Column(name = "user_mobilenumber")
	private long mobilenumber;
	
	@Column(name = "user_profileimage")
	private String profileimage;
	
	@Column(name = "user_createdtime")
	private Date createdtime;
	
	@Column(name = "user_updatedtime")
	private Date updatedtime;
	

	public String getFullname() {
		return fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isGender() {
		return gender;
	}

	public void setGender(boolean gender) {
		this.gender = gender;
	}

	public String getHooby() {
		return hooby;
	}

	public void setHooby(String hooby) {
		this.hooby = hooby;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDateofbirth() {
		return dateofbirth;
	}

	public void setDateofbirth(Date dateofbirth) {
		this.dateofbirth = dateofbirth;
	}

	public long getMobilenumber() {
		return mobilenumber;
	}

	public void setMobilenumber(long mobilenumber) {
		this.mobilenumber = mobilenumber;
	}

	public String getProfileimage() {
		return profileimage;
	}

	public void setProfileimage(String profileimage) {
		this.profileimage = profileimage;
	}
	
	
	
}
