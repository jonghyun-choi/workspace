package com.example.demo.mapper;

import java.util.List;
import java.util.Map;

public interface OrderDetailsMapper {
	
	int pagedOrderCount(int no);

	List<Map<String, Object>> pagedOrder(int no,int limit,int offset);

}
