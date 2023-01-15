package com.example.demo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.OrderDetailsMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class RootController {

	private final OrderDetailsMapper orderDetailsMapper;

	// 생성자 주입, @Autowired 와 동일하며
	// private final이라 개발자가 userMapper = null 과 같은 코딩을 할 수 없다.
	public RootController(OrderDetailsMapper orderDetailsMapper) {
		this.orderDetailsMapper = orderDetailsMapper;
	}

	@GetMapping(path = "/data")
	public Map<String, Object> index(
			@RequestParam(name = "pageSize", required = true) int pageSize,
			@RequestParam(name = "pageNumber", required = true) int pageNumber) {
		int total = orderDetailsMapper.pagedOrderCount(10000);
		int limit = pageSize;
		int offset = (pageNumber - 1) * pageSize;
		List<Map<String, Object>> orders = orderDetailsMapper.pagedOrder(10000, limit, offset);

		log.info(">>> total,limit,offset: {},{},{}", total, limit, offset);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", String.valueOf(total));
		data.put("rows", orders);

		return data;

	}

}
