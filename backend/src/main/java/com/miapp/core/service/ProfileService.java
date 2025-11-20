package com.miapp.core.service;

import com.miapp.core.dto.ProfileDTO;
import com.miapp.core.entity.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Value;
import java.util.*;

@Service
public class ProfileService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.service-role-key}")
    private String supabaseServiceKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public ProfileDTO getProfile(String userId) {
        try {
            String url = supabaseUrl + "/rest/v1/profiles?id=eq." + userId;
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", supabaseServiceKey);
            headers.set("Authorization", "Bearer " + supabaseServiceKey);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<Profile[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, Profile[].class);
            
            if (response.getBody() != null && response.getBody().length > 0) {
                return convertToDTO(response.getBody()[0]);
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error fetching profile: " + e.getMessage());
        }
    }

    public ProfileDTO updateProfile(String userId, ProfileDTO profileDTO) {
        try {
            String url = supabaseUrl + "/rest/v1/profiles?id=eq." + userId;
            
            HttpHeaders headers = new HttpHeaders();
            headers.set("apikey", supabaseServiceKey);
            headers.set("Authorization", "Bearer " + supabaseServiceKey);
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Prefer", "return=representation");

            Map<String, Object> updateData = new HashMap<>();
            if (profileDTO.getFullName() != null) updateData.put("full_name", profileDTO.getFullName());
            if (profileDTO.getBio() != null) updateData.put("bio", profileDTO.getBio());
            if (profileDTO.getCompanyName() != null) updateData.put("company_name", profileDTO.getCompanyName());
            if (profileDTO.getIndustry() != null) updateData.put("industry", profileDTO.getIndustry());
            if (profileDTO.getWebsite() != null) updateData.put("website", profileDTO.getWebsite());
            if (profileDTO.getLinkedinUrl() != null) updateData.put("linkedin_url", profileDTO.getLinkedinUrl());
            if (profileDTO.getLocation() != null) updateData.put("location", profileDTO.getLocation());
            if (profileDTO.getAvatarUrl() != null) updateData.put("avatar_url", profileDTO.getAvatarUrl());
            if (profileDTO.getPhone() != null) updateData.put("phone", profileDTO.getPhone());
            if (profileDTO.getBirthDate() != null) updateData.put("birth_date", profileDTO.getBirthDate());
            if (profileDTO.getExperienceLevel() != null) updateData.put("experience_level", profileDTO.getExperienceLevel());
            if (profileDTO.getSkills() != null) updateData.put("skills", profileDTO.getSkills());
            if (profileDTO.getInterests() != null) updateData.put("interests", profileDTO.getInterests());
            if (profileDTO.getIsMentor() != null) updateData.put("is_mentor", profileDTO.getIsMentor());
            if (profileDTO.getIsInvestor() != null) updateData.put("is_investor", profileDTO.getIsInvestor());
            if (profileDTO.getYearsExperience() != null) updateData.put("years_experience", profileDTO.getYearsExperience());
            if (profileDTO.getCompanyStage() != null) updateData.put("company_stage", profileDTO.getCompanyStage());
            if (profileDTO.getFundingStage() != null) updateData.put("funding_stage", profileDTO.getFundingStage());
            if (profileDTO.getTeamSize() != null) updateData.put("team_size", profileDTO.getTeamSize());
            if (profileDTO.getRevenueRange() != null) updateData.put("revenue_range", profileDTO.getRevenueRange());
            if (profileDTO.getLookingFor() != null) updateData.put("looking_for", profileDTO.getLookingFor());

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(updateData, headers);
            ResponseEntity<Profile[]> response = restTemplate.exchange(url, HttpMethod.PATCH, entity, Profile[].class);
            
            if (response.getBody() != null && response.getBody().length > 0) {
                return convertToDTO(response.getBody()[0]);
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException("Error updating profile: " + e.getMessage());
        }
    }

    private ProfileDTO convertToDTO(Profile profile) {
        ProfileDTO dto = new ProfileDTO();
        dto.setId(profile.getId());
        dto.setEmail(profile.getEmail());
        dto.setUsername(profile.getUsername());
        dto.setFullName(profile.getFullName());
        dto.setBio(profile.getBio());
        dto.setCompanyName(profile.getCompanyName());
        dto.setIndustry(profile.getIndustry());
        dto.setWebsite(profile.getWebsite());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setLocation(profile.getLocation());
        dto.setAvatarUrl(profile.getAvatarUrl());
        dto.setPhone(profile.getPhone());
        dto.setBirthDate(profile.getBirthDate());
        dto.setExperienceLevel(profile.getExperienceLevel());
        dto.setSkills(profile.getSkills());
        dto.setInterests(profile.getInterests());
        dto.setIsMentor(profile.getIsMentor());
        dto.setIsInvestor(profile.getIsInvestor());
        dto.setYearsExperience(profile.getYearsExperience());
        dto.setCompanyStage(profile.getCompanyStage());
        dto.setFundingStage(profile.getFundingStage());
        dto.setTeamSize(profile.getTeamSize());
        dto.setRevenueRange(profile.getRevenueRange());
        dto.setLookingFor(profile.getLookingFor());
        dto.setCreatedAt(profile.getCreatedAt());
        dto.setUpdatedAt(profile.getUpdatedAt());
        return dto;
    }
}