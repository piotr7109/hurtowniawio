package com.beef.controllers.item;

import com.beef.core.hibernate.HibernateBase;
import com.beef.core.utils.UserUtils;
import com.beef.domian.item.Item;
import com.beef.domian.item.ItemHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;

public class ItemService {

    private static String uploadsPath = "/public/uploads/uploaded_images/";

    protected static String saveImage(HttpServletRequest request, MultipartFile image) throws IOException {
        String imagePathName = uploadsPath + image.getOriginalFilename();
        File imageFile = new File(request.getRealPath(imagePathName));

        image.transferTo(imageFile);

        return imagePathName;
    }

    protected static Item addItem(HttpSession session, HttpServletRequest request,
                                  String itemData, MultipartFile image) throws IOException {
        HibernateBase.closeEntityManagers();
        Item result = null;
        if (UserUtils.checkUserType(session, "hurtownik")) {
            String imageRef = saveImage(request, image);
            Item item = new ObjectMapper().readValue(itemData, Item.class);
            item.setImagePath(imageRef);
            ItemHelper.createItem(item);

            result =  item;

        }
        return result;
    }

    protected static List<Item> getAllItems(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Item> result = null;

        if (UserUtils.isUserAuthenticated(session)) {
            result = ItemHelper.getAllItems();
        }

        return result;
    }

    protected static List<Item> getUnusedItems(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Item> result = null;

        if(UserUtils.isUserAuthenticated(session)) {
            result = ItemHelper.getUnusedItems();
        }

        return result;
    }

    protected static List<Item> getUsedItems(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Item> result = null;

        if(UserUtils.isUserAuthenticated(session)) {
            result = ItemHelper.getUsedItems();
        }

        return result;
    }

}
