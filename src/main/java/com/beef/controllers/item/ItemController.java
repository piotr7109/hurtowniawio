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

    @GetMapping("/getAllItems")
    public List<Item> getAllItems(HttpSession session) {
        return ItemService.getAllItems(session);
    }

    @GetMapping("/getUnusedItems")
    public List<Item> getUnusedItems(HttpSession session) {
        return ItemService.getUnusedItems(session);
    }

    @GetMapping("/getUsedItems")
    public List<Item> getUsedItems(HttpSession session) {
        return ItemService.getUsedItems(session);
    }

    @PostMapping("/removeItem")
    public boolean removeItem(HttpSession session, @RequestParam("itemId") String itemId) {
        return ItemService.removeItem(session, itemId);
    }
}
