package com.pgdac.elearning.Controller;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pgdac.elearning.Dto.CoursesDto;
import com.pgdac.elearning.Dto.Credentials;
import com.pgdac.elearning.Dto.Response;
import com.pgdac.elearning.Dto.UserDTO;
import com.pgdac.elearning.Dto.UserDTOS;
import com.pgdac.elearning.Entity.Enrollment;
import com.pgdac.elearning.Entity.User;
//import com.pgdac.elearning.dto.UserDto;
import com.pgdac.elearning.services.UserService;

@CrossOrigin(origins = "*")
@RestController
public class UserController {
	
        @Autowired
        private UserService userService;
        
        @Autowired
    	private JavaMailSender javasender;
        
        @GetMapping("/user/test")
        public String test() {
        	return "Welcome To BackEnd";
        }
        
        @PostMapping("/user/signin")
    	public ResponseEntity<?> signIn(@RequestBody Credentials cred) {
    		UserDTO userDto = userService.authenticate(cred);
    		if(userDto == null)
    			return Response.error("user not found");
    		return Response.success(userDto);
    	}
        
        
        @PostMapping("user/signup")
    	public ResponseEntity<?> signUp(@Valid @RequestBody UserDTO userDto) {
        	SimpleMailMessage msg = new SimpleMailMessage();
    		Map<String, Object> student = userService.saveUser(userDto);
    		CompletableFuture<Void> future = CompletableFuture.runAsync(()->{
            	msg.setTo(userDto.getEmail());
            	msg.setSubject("Account created Successfully");
            	msg.setText("Dear "+userDto.getfName()+ " "+userDto.getlName()+", \n Your account is Successfully created.\n Welcome to the team E-Learning.\n\nRegards\n ServiceJunction");
        		javasender.send(msg);
            });
    		return Response.success(student);
    	}

        
//        @PostMapping("user/signup")
//    	public ResponseEntity<UserDTOS> createNewStudent(@Valid @RequestBody UserDTOS stud) {
//    		SimpleMailMessage msg = new SimpleMailMessage();
//    		UserDTOS student = userService.saveUser(stud);
////    		log.info("Student Details : " + student);
//            CompletableFuture<Void> future = CompletableFuture.runAsync(()->{
//            	msg.setTo(student.getEmail());
//            	msg.setSubject("Account created Succeffully");
//            	msg.setText("Dear "+student.getfName()+ " "+student.getlName()+", \n Your account is Successfully created. Welcome to the team E-Learning.\n\nRegards\n ServiceJunction");
//        		javasender.send(msg);
//            });
//            return ResponseEntity.status(HttpStatus.CREATED).body(student);
//    	}
        
        @GetMapping("user/all")
        public ResponseEntity<?> showAllUser(){
        	List<User> result = new ArrayList<>();
        	result = userService.findAllUser();
        	return Response.success(result);
        }
        
        @DeleteMapping("user/delete/{id}")
    	public ResponseEntity<?> deleteUser(@Valid @PathVariable("id") int id) {
    		Map<String, Object> result = userService.deleteUser(id);
    		return Response.success(result);
    	}
        @GetMapping("user/find/{id}")
        public ResponseEntity<?> findUserById(@Valid @PathVariable("id") int id){
        	UserDTO result = userService.findUserById(id);
        	return Response.success(result);
        }
        
        @PutMapping("user/updateprofile")
    	public ResponseEntity<?> updateUser(@RequestBody @Valid User stud){
    		SimpleMailMessage msg = new SimpleMailMessage();
    		User student=userService.updateStudent(stud);
//    		log.info("user updated details :: "+student);
    		CompletableFuture<Void> future=CompletableFuture.runAsync(()->
    		{
    		msg.setTo(student.getEmail());
    		msg.setSubject("Account updated Succeffully");
    		msg.setText("Dear "+student.getfName()+""+student.getlName()+", \n Your account is Successfully updated.\n\nRegards\n ServiceJunction");
    		javasender.send(msg);
    		});
    		return ResponseEntity.status(HttpStatus.OK).body(student);
    		
    	}
        
     
        
        
        
}
