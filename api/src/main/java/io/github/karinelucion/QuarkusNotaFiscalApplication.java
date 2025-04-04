package io.github.karinelucion;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;

import javax.ws.rs.core.Application;

@OpenAPIDefinition(
        info = @Info(
                title="API Quarkus Social",
                version = "1.0",
                contact = @Contact(
                        name = "Karine Lucion",
                        url = "https://www.linkedin.com/in/karine-lucion-126096224/",
                        email = "karinelucion04@gmail.com"),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://www.apache.org/licenses/LICENSE-2.0.html"))
)
public class QuarkusNotaFiscalApplication extends Application {
}
