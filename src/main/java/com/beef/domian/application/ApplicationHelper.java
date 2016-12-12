package com.beef.domian.application;

import com.beef.domian.BaseHelper;

public class ApplicationHelper extends BaseHelper{

    public static void createApplication(Application app) {
        persist(app);
    }
}
