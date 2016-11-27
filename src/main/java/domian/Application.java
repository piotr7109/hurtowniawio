package domian;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Application {

    @Id
    @GeneratedValue
    private long id;

    @OneToOne
    private User user;

    private float price;

    private int preferredAmount;

    @Temporal(TemporalType.DATE)
    private Date date;

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

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public int getPreferredAmount() {
        return preferredAmount;
    }

    public void setPreferredAmount(int preferredAmount) {
        this.preferredAmount = preferredAmount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
