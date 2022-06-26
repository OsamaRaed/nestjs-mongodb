import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
    
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}