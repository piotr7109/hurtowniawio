package com.beef.domian.auction;

import com.beef.domian.item.Item;
import com.beef.domian.user.User;
import com.beef.domian.application.Application;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Auction {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne
    private User user;

    @OneToOne
    private Item item;

    private String title;

    @Column(columnDefinition="text")
    private String description;

    private int amount;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @Temporal(TemporalType.DATE)
    private Date creationDate;

    private String state;

    private String deliveryState;

    @OneToOne
    @JoinColumn(name = "delivererId")
    private User deliverer;

    @OneToMany
    @JoinColumn(name = "auctionId")
    private List<Application> applications;

    @OneToOne
    @JoinColumn(name = "victoriousApplicationId")
    private Application victoriousApplication;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getDeliveryState() {
        return deliveryState;
    }

    public void setDeliveryState(String deliveryState) {
        this.deliveryState = deliveryState;
    }

    public User getDeliverer() {
        return deliverer;
    }

    public void setDeliverer(User deliver) {
        this.deliverer = deliver;
    }

    public List<Application> getApplications() {
        return applications;
    }

    public void setApplications(List<Application> applications) {
        this.applications = applications;
    }

    public Application getVictoriousApplication() {
        return victoriousApplication;
    }

    public void setVictoriousApplication(Application victoriousApplication) {
        this.victoriousApplication = victoriousApplication;
    }

    public void addApplication(Application app) {
        if (applications == null) {
            applications = new ArrayList<Application>();
        }
        applications.add(app);
    }

    public void clearUser() {
        user.setPassword("");
    }
}
