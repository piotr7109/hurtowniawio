package com.beef.controllers.item;

import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;

public class ItemService {

    private static String uploadsPath = "/public/uploads/uploaded_images/";

    protected static String saveImage(HttpServletRequest request, MultipartFile image) throws IOException {
        String imagePathName = uploadsPath + image.getOriginalFilename();
        File imageFile = new File(request.getRealPath(imagePathName));

        image.transferTo(imageFile);

        return imagePathName;
    }

}
