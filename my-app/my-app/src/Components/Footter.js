import React from 'react';
import './footer.css';
import '../Components/App.css'
import { Container, Col, Row } from 'reactstrap';
import fb from '../assert/icon/footer/fb.png';
 import insta from '../assert/icon/footer/insta.png';
 import google from '../assert/icon/footer/google.png';
 import tweet from '../assert/icon/footer/tweet.png';
 import linkedin from '../assert/icon/footer/linkedIn.png';
 import logo from "../Pages/image/logo.png"

import { Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer>
			
        <div className="footer-top">
            <div className='container'>
                <div className='row'>
                
                    <h2><img
              src={logo}
              className="d-inline-block align-top logo"
              alt="psd logo"
            />E-Learning Online Plateform</h2>
                    <div className="col-md-4">
                        <h5 className="title-sm">Navigation</h5>
                        <div className="footer-links">
                            <a href="/Courses">Course</a>
                            <a href="/">Contact Us</a>
                            <a href="/Aboutus">About Us</a>
                            <a href="/">Blog</a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h5 className="title-sm">More</h5>
                        <div className="footer-links">
                            <a href="/">FAQ</a>
                            <a href="/"> Privacy & Policy</a>
                            <a href="/">Licences</a>
                        </div>
                    </div>
                    <div className="col-md-4">
							<h5 className="title-sm">Contact</h5>
							<div className="footer-links">
								<p className="mb">25 Diamond Tower, Bhosale Street, Pune, 411001</p>
								<p className='mb'>+91-9589139739</p>
								<p className='mb'>elearningpgdac@gmail.com</p>
							</div>
						</div>
                </div>
            </div>
        </div>
    </footer>
    );
}
export default Footer;