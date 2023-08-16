package com.example.fullCRUD.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.example.fullCRUD.user.UserDetaisServiceImpl;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private DataSource dataSource;

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetaisServiceImpl();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//		http.csrf().disable();
        String[] staticResources = {"/css/**", "/js/**", "/webjars/bootstrap/css/**", "/webjars/jquery/**",
                "/webjars/bootstrap/js/**",};

        // Custom login page
//		http.formLogin().loginPage("/login").usernameParameter("username").passwordParameter("password")
//				.loginProcessingUrl("/process_login").defaultSuccessUrl("/quotation").permitAll().and().logout()
//				.logoutSuccessUrl("/login").permitAll();
//
//		http.authorizeRequests().antMatchers("/quotation").authenticated().and().authorizeRequests()
//				.antMatchers("/papersList").authenticated().and().authorizeRequests().antMatchers("/users")
//				.authenticated().anyRequest().permitAll().and().formLogin().usernameParameter("username")
//				.passwordParameter("password").defaultSuccessUrl("/quotation").permitAll().and().logout()
//				.logoutSuccessUrl("/login").permitAll();

        http.authorizeRequests().antMatchers("/forgot_password").permitAll()
                .antMatchers("/addpaper")
                .hasAnyAuthority("SUPER_ADMIN", "ADMIN")
                .antMatchers("/pending_drafts_account")
                .hasAnyAuthority("ACCOUNT")
                .antMatchers("/rejectdraft_account")
                .hasAnyAuthority("ACCOUNT")
                .antMatchers("/confirm_draft_account/**")
                .hasAnyAuthority("ACCOUNT")
                .antMatchers("/editprops/**")
                .hasAnyAuthority("SUPER_ADMIN", "ADMIN")
                .antMatchers("/add_user_to_my_company")
                .hasAnyAuthority("SUPER_ADMIN", "ADMIN")
                .antMatchers("/add_into_company/**")
                .hasAnyAuthority("SUPER_ADMIN")
                .antMatchers("/addcompany")
                .hasAnyAuthority("SUPER_ADMIN")
                .antMatchers("/save_company")
                .hasAnyAuthority("SUPER_ADMIN")
                .antMatchers("/reset_password").permitAll()
                .antMatchers("/users").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/displayppcats").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/editordeletepapercategory/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/deletepapercategory/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/displayppgrams").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/editordeletepapergrammage/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/deleteppgramm/**").hasAnyAuthority("ADMIN", "SUPER_ADMIN").antMatchers("/deletecolor/**")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN")
                .antMatchers("/userpendingdraft/**")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN", "PRODUCTION_MANAGER")
                .antMatchers("/editcolor/**")
                .hasAnyAuthority("ADMIN").antMatchers("/edituser/**")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN").antMatchers("/deletedraft/**")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN", "PRODUCTION_MANAGER").antMatchers("/confirm_draft/**")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN", "PRODUCTION_MANAGER").antMatchers("/pending_drafts")
                .hasAnyAuthority("ADMIN", "SUPER_ADMIN", "PRODUCTION_MANAGER").antMatchers("/editpaper/**").hasAnyAuthority("ADMIN")
                .antMatchers("/deletepaper/**").hasAuthority("ADMIN").antMatchers("/process_register").permitAll()
                .antMatchers(staticResources).permitAll().anyRequest().authenticated().and().formLogin()
                .loginPage("/login").loginProcessingUrl("/process_login")
                .successHandler(new AuthenticationSuccessHandler() {

                    @Autowired
                    private HttpSession session;

                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                        Authentication authentication) throws IOException, ServletException {

                        if (session.getAttribute("lastUrl") != null) {
                            String lastUrl = (String) session.getAttribute("lastUrl");
                            session.removeAttribute("lastUrl");
                            response.sendRedirect(lastUrl);
                        } else {
                            response.sendRedirect("/");
                        }
                    }
                }).defaultSuccessUrl("/").permitAll().and().rememberMe().and().logout().logoutSuccessUrl("/login")
                .permitAll().and().exceptionHandling().accessDeniedPage("/403");
    }

}
