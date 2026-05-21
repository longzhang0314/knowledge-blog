---
title: "Spring 拦截器——HandlerInterceptor"
description: "Spring 拦截器——HandlerInterceptor 的历史学习笔记。"
date: 2026-05-21
tags: ["Spring", "框架"]
keywords: ["Spring", "框架", "Spring 拦截器——HandlerInterceptor"]
legacy_source: "框架/Spring/Spring 拦截器——HandlerInterceptor.md"
---
#### Spring 拦截器——HandlerInterceptor


https://www.jianshu.com/p/dc5cc2e25ab2


今天在做项目的时候偶遇一个业务需求：用户登录后要对用户密码强度进行判断，密码过期的话不强制登出，而只强制用户跳转到密码修改页面，而不能进行其他操作，包括后台的api的请求。

注意：此时用户仍然处于登录状态，因此登录的后端api权限验证此时都是授权的。

因此，采用Spring拦截器的方式进行业务处理。HandlerInterceptor拦截器常见的用途有：

1、日志记录：记录请求信息的日志，以便进行信息监控、信息统计、计算PV（Page View）等。

2、权限检查：如登录检测，进入处理器检测检测是否登录，如果没有直接返回到登录页面；

3、性能监控：有时候系统在某段时间莫名其妙的慢，可以通过拦截器在进入处理器之前记录开始时间，在处理完后记录结束时间，从而得到该请求的处理时间（如果有反向代理，如apache可以自动记录）；

4、通用行为：读取cookie得到用户信息并将用户对象放入请求，从而方便后续流程使用，还有如提取Locale、Theme信息等，只要是多个处理器都需要的即可使用拦截器实现。

5、OpenSessionInView：如Hibernate，在进入处理器打开Session，在完成后关闭Session。

…………本质也是AOP（面向切面编程），也就是说符合横切关注点的所有功能都可以放入拦截器实现。

废话不多说，直接上代码，代码的理解放在注释里。

```
package com.gildata.gup.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.gildata.gup.domain.User;
import com.gildata.gup.domain.UserEncryptReset;
import com.gildata.gup.repository.UserEncryptResetRepository;

@Component // 不可少
public class PasswordStateInterceptor implements HandlerInterceptor &#123; // 必须实现HandlerInterceptor接口

    @Autowired
    private UserEncryptResetRepository userEncryptResetRepository;//用户密码状态的查询的DAO类
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception &#123;
        // TODO Auto-generated method stub
        SecurityContext securityContext =  (SecurityContext) request.getSession().getAttribute("SPRING_SECURITY_CONTEXT"); // 获取session中的SecurityContext对象，它包含了用户的信息
        User user = (User) securityContext.getAuthentication().getPrincipal();
        if ( !user.equals(null) ) &#123; // 说明已经登录了
            UserEncryptReset uer = userEncryptResetRepository.findOneByUsername(user.getUsername()); //查询记录用户密码状态的对象
            if ((uer != null) && (uer.getPasswordState().equals("1"))) &#123; //uer存在并且用户密码状态为过期状态，才不允许放行
                response.sendRedirect("/#/passwordReset"); // 将用户
                return false;
            &#125;
        &#125;
        return true;
    &#125;

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
            ModelAndView modelAndView) throws Exception &#123;
        // TODO Auto-generated method stub
        return;
    &#125;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception &#123;
        // TODO Auto-generated method stub
    &#125;
&#125;
```

有了拦截器PasswordStateInterceptor，还需要对拦截器进行注册。需要使用WebMvcConfigurerAdapter 下的addInterceptors方法。 新建一个类WebConfigfilter.java，继承自WebMvcConfigurerAdapter 。

```
package com.gildata.gup.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.gildata.gup.interceptor.PasswordStateInterceptor;

@Configuration // 配置
public class WebConfigfilter extends WebMvcConfigurerAdapter&#123;
    
    @Autowired
    private PasswordStateInterceptor passwordStateInterceptor; // 实例化拦截器

    @Override
    public void addInterceptors(InterceptorRegistry registry) &#123;
        // super.addInterceptors(registry);
        // 注册自定义的拦截器passwordStateInterceptor
        registry.addInterceptor(passwordStateInterceptor)
            .addPathPatterns("/api/*") //匹配要过滤的路径
            .excludePathPatterns("/api/changePasswordByUser/*") //匹配不过滤的路径。密码还要修改呢，所以这个路径不能拦截
            .excludePathPatterns("/api/passwordStateValid") //密码状态验证也不能拦截
            .excludePathPatterns("/api/getManagerVersion");//版本信息同样不能拦截
    &#125;
&#125;
```

此时拦截器就会生效了。

下面重点讲解拦截器下的三个重载方法：
preHandle
postHandle
afterCompletion
（1）preHandle (HttpServletRequest request, HttpServletResponse response, Object handle) 方法，顾名思义，该方法将在请求处理之前进行调用。SpringMVC 中的Interceptor 是链式的调用的，在一个应用中或者说是在一个请求中可以同时存在多个Interceptor 。每个Interceptor 的调用会依据它的声明顺序依次执行，而且最先执行的都是Interceptor 中的preHandle 方法，所以可以在这个方法中进行一些前置初始化操作或者是对当前请求的一个预处理，也可以在这个方法中进行一些判断来决定请求是否要继续进行下去。该方法的返回值是布尔值Boolean 类型的，当它返回为false 时，表示请求结束，后续的Interceptor 和Controller 都不会再执行；当返回值为true 时就会继续调用下一个Interceptor 的preHandle 方法，如果已经是最后一个Interceptor 的时候就会是调用当前请求的Controller 方法。

（2）postHandle (HttpServletRequest request, HttpServletResponse response, Object handle, ModelAndView modelAndView) 方法，由preHandle 方法的解释我们知道这个方法包括后面要说到的afterCompletion 方法都只能是在当前所属的Interceptor 的preHandle 方法的返回值为true 时才能被调用。postHandle 方法，顾名思义就是在当前请求进行处理之后，也就是Controller 方法调用之后执行，但是它会在DispatcherServlet 进行视图返回渲染之前被调用，所以我们可以在这个方法中对Controller 处理之后的ModelAndView 对象进行操作。postHandle 方法被调用的方向跟preHandle 是相反的，也就是说先声明的Interceptor 的postHandle 方法反而会后执行，这和Struts2 里面的Interceptor 的执行过程有点类型。Struts2 里面的Interceptor 的执行过程也是链式的，只是在Struts2 里面需要手动调用ActionInvocation 的invoke 方法来触发对下一个Interceptor 或者是Action 的调用，然后每一个Interceptor 中在invoke 方法调用之前的内容都是按照声明顺序执行的，而invoke 方法之后的内容就是反向的。

（3）afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handle, Exception ex) 方法，该方法也是需要当前对应的Interceptor 的preHandle 方法的返回值为true 时才会执行。顾名思义，该方法将在整个请求结束之后，也就是在DispatcherServlet 渲染了对应的视图之后执行。这个方法的主要作用是用于进行资源清理工作的。

注意： handler，第三个参数为响应处理器（一般为Controller）。
