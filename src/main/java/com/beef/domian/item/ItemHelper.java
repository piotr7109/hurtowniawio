package com.beef.domian.item;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;

import javax.persistence.TypedQuery;
import java.util.List;

public class ItemHelper extends BaseHelper {

    public static void createItem(Item item) {
        persist(item);
    }

    public static List<Item> getItems(String queryValue) {
        List<Item> items;
        TypedQuery<Item> query = HibernateBase.entityManager.createQuery(queryValue, Item.class);

        try {
            items = query.getResultList();
        } catch (Exception e) {
            items = null;
        }

        return items;
    }

    public static Item getItemById(long id) {
        Item item = HibernateBase.entityManager.find(Item.class, id);
        return item;
    }

    public static List<Item> getAllItems() {
        String query = "select i from Item i";

        return getItems(query);
    }

    public static List<Item> getUnusedItems() {
        String query = "select distinct i from Auction a right join a.item i where a.id is null";

        return getItems(query);
    }

    public static List<Item> getUsedItems() {
        String query = "select distinct i from Auction a right join a.item i where a.id is not null";

        return getItems(query);
    }

    public static boolean removeItem(long itemId) {
        Item item = HibernateBase.entityManager.find(Item.class, itemId);

        List<Item> unusedItems = ItemHelper.getUnusedItems();

        if(unusedItems.contains(item)) {
            HibernateBase.entityManager.getTransaction().begin();
            HibernateBase.entityManager.remove(item);
            HibernateBase.entityManager.getTransaction().commit();
            return HibernateBase.entityManager.find(Item.class, itemId) == null;
        }

        return false;
    }
}
