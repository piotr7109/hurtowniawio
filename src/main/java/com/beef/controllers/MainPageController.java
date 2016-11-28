package com.beef.controllers;

import com.beef.core.utils.HtmlFileUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainPageController {

    @GetMapping
    public String getMainPage() {
        return HtmlFileUtils.getHtmlFile("/webapp/WEB-INF/view/index.html");
    }

}
