package com.beef.domian.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

    public User() {}

    public User(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public User(User user) {
        this.updateData(user);
        password = "";
    }

    @Id
    @GeneratedValue
    private long id;

    private String login;

    private String password;

    private String firstName;

    private String lastName;

    private String address;

    private String email;

    private String status;

    private String type;

    public void updateData(User user) {
        login = user.login;
        password = user.password;
        firstName = user.firstName;
        lastName = user.lastName;
        address = user.address;
        email = user.email;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
