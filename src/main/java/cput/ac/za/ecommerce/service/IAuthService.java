package cput.ac.za.ecommerce.service;

import cput.ac.za.ecommerce.request.LoginRequest;
import cput.ac.za.ecommerce.response.AuthResponse;

public interface IAuthService {


    AuthResponse login(
            LoginRequest request
    );

}