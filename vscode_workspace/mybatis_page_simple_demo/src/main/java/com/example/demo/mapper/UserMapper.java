package com.example.demo.mapper;

import java.util.List;
import java.util.Map;

public interface UserMapper {

	List<Map<String, Object>> selectByUserId(String user_id);

}
