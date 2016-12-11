package com.beef.controllers.item;

import com.beef.domian.item.Item;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;

@RestController
public class ItemController {

    @PostMapping("/addItem")
    public Item addItem(HttpSession session, HttpServletRequest request, @RequestParam("data") String itemData,
                          @RequestParam("image") MultipartFile image) throws IOException {

        return ItemService.addItem(session, request, itemData, image);
    }
}
