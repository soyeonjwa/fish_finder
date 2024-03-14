package com.ssafy.fishfinder.repository;

import com.ssafy.fishfinder.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
