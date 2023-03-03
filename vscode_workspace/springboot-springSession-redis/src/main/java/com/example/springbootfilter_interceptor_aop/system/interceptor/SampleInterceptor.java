package com.example.springbootfilter_interceptor_aop.system.interceptor;

import java.util.Objects;
import java.util.Set;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SampleInterceptor implements HandlerInterceptor {
    final static private String ATTRIBUTE_NAME = "testAttribute";

    private RedisTemplate<String, Object> redisTemplate;

    public SampleInterceptor(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object Handler
    ) throws Exception {
        HttpSession session = request.getSession(false);
        if(Objects.isNull(session)) {
            session = request.getSession();
        }

        session.setAttribute(ATTRIBUTE_NAME, "testValue");

        // ScanOptions scanOptions = ScanOptions.scanOptions().match("spring:session:sessions:*").count(10).build();
        // try(Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(scanOptions)) {
        //     while(cursor.hasNext()) {
        //         byte[] key = cursor.next();
        //         byte[] value = redisTemplate.opsForValue().get(SerializationUtils.deserialize(key));
        //         log.info("the key : {}", new String(key));
        //     }
        // }

        // try(Cursor<Entry<byte[], byte[]>> entries = connection.hashCommands().hScan("*".getBytes(), scanOptions)) {
        //     while(entries.hasNext()) {
        //         Entry<byte[], byte[]> entry = entries.next();
        //         byte[] key = entry.getKey();
        //         byte[] value = entry.getValue();
        //         log.info("SampleInterceptor::preHandle::doInRedis >>> {} | {}", new String(key), new String(value));
        //     }
        // }

        redisTemplate.execute(new RedisCallback<Set<String>>() {
            @Override
            public Set<String> doInRedis(RedisConnection connection) throws DataAccessException {
                ScanOptions scanOptions = ScanOptions.scanOptions().match("spring:session:sessions:*").count(10).build();
                try(Cursor<byte[]> cursor = connection.commands().scan(scanOptions)) {
                    while(cursor.hasNext()) {
                        byte[] key = cursor.next();
                        byte[] value = connection.commands().hGet(key, ("sessionAttr:" + ATTRIBUTE_NAME).getBytes());
                        log.info("SampleInterceptor::preHandle::doInRedis >>> {} | {}", new String(key), new String(value));
                    }
                }
                catch(Exception e) {
                    log.error("SampleInterceptor::preHandle::doInRedis >>> {}", e.toString());
                }

                return null;
            }
        });


        return true;
    }
    
}
