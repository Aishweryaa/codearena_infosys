package com.codearena.codearena.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimiterService {

    private static class TokenBucket {
        long lastRefillTime = System.currentTimeMillis();
        double tokens = 2.0; // Max allowed requests capacity boundary
        final double refillRatePerMs = 2.0 / 10000.0; // Refills 2 tokens every 10 seconds

        synchronized boolean allowRequest() {
            long now = System.currentTimeMillis();
            // Calculate how many tokens should be generated since last active call
            tokens = Math.min(2.0, tokens + (now - lastRefillTime) * refillRatePerMs);
            lastRefillTime = now;

            if (tokens >= 1.0) {
                tokens -= 1.0;
                return true;
            }
            return false;
        }
    }

    private final Map<Long, TokenBucket> userBuckets = new ConcurrentHashMap<>();

    public boolean isAllowed(Long userId) {
        return userBuckets.computeIfAbsent(userId, k -> new TokenBucket()).allowRequest();
    }
}
