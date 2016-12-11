package com.beef.controllers.item;

import com.beef.domian.item.Item;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
public class ItemController {

    @PostMapping("/addItem")
    public Item addItem(HttpSession session, HttpServletRequest request, @RequestParam("data") String itemData,
                        @RequestParam("image") MultipartFile image) throws IOException {

        return ItemService.addItem(session, request, itemData, image);
    }

    @GetMapping("getItems")
    public List<Item> getItems(HttpSession session) {
        return ItemService.getItems(session);
    }
}
