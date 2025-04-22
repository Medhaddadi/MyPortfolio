export const blogPosts = [
  {
    title: "Les meilleures pratiques pour le développement Java en 2024",
    slug: "meilleures-pratiques-java-2024",
    excerpt: "Découvrez les meilleures pratiques, outils et frameworks pour le développement Java moderne en 2024.",
    content: `
      <p>Le développement Java continue d'évoluer rapidement, avec de nouvelles fonctionnalités et pratiques qui émergent chaque année. En 2024, plusieurs tendances clés façonnent la façon dont les développeurs Java travaillent et construisent des applications.</p>
      
      <h2>1. Adoption de Java 21 LTS et au-delà</h2>
      <p>Java 21, la dernière version LTS (Long-Term Support), apporte de nombreuses améliorations significatives comme les Virtual Threads, le Pattern Matching pour switch, et les Foreign Function & Memory API. Ces fonctionnalités permettent d'écrire un code plus concis, plus lisible et plus performant.</p>
      
      <h2>2. Programmation réactive et non-bloquante</h2>
      <p>Avec l'introduction des Virtual Threads dans Java 21, la programmation concurrente devient beaucoup plus simple et efficace. Cependant, les frameworks réactifs comme Project Reactor et RxJava restent pertinents pour les applications nécessitant un traitement asynchrone avancé.</p>
      
      <h2>3. Microservices et architecture cloud-native</h2>
      <p>Spring Boot et Quarkus continuent de dominer l'écosystème des microservices Java. Quarkus gagne en popularité grâce à son démarrage rapide et sa faible empreinte mémoire, ce qui le rend idéal pour les environnements cloud et Kubernetes.</p>
      
      <h2>4. Tests automatisés et TDD</h2>
      <p>Le Test-Driven Development reste une pratique essentielle. JUnit 5 avec ses extensions, combiné à des outils comme Mockito et AssertJ, forme une suite de test puissante. Les tests d'intégration avec Testcontainers gagnent également en popularité.</p>
      
      <h2>5. DevOps et CI/CD</h2>
      <p>L'intégration et le déploiement continus sont désormais standard. Des outils comme GitHub Actions, Jenkins, et GitLab CI permettent d'automatiser les pipelines de build, test et déploiement. Les pratiques GitOps gagnent également du terrain.</p>
      
      <h2>Conclusion</h2>
      <p>Le développement Java en 2024 est plus dynamique que jamais. En adoptant ces pratiques modernes et en restant à jour avec les dernières versions de Java et ses écosystèmes, les développeurs peuvent créer des applications plus robustes, performantes et maintenables.</p>
    `,
    date: "15 avril 2024",
    author: "Mohamed El Haddadi",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Java",
    tags: ["Java", "Spring Boot", "Microservices", "Best Practices"],
    coverImage: "/blog/java-2024.jpg",
    readTime: 8,
    likes: 42,
    comments: [
      {
        author: "Jean Dupont",
        content: "Article très instructif, merci pour le partage !",
        date: "16 avril 2024",
      },
    ],
  },
  {
    title: "Comment construire une API RESTful avec Spring Boot",
    slug: "api-restful-spring-boot",
    excerpt: "Un guide étape par étape pour créer une API RESTful robuste et sécurisée avec Spring Boot.",
    content: `
      <p>Spring Boot est devenu le framework de choix pour développer des applications Java modernes, en particulier des API RESTful. Dans cet article, nous allons explorer comment créer une API RESTful complète avec Spring Boot.</p>
      
      <h2>Prérequis</h2>
      <p>Avant de commencer, assurez-vous d'avoir installé :</p>
      <ul>
        <li>Java 17 ou supérieur</li>
        <li>Maven ou Gradle</li>
        <li>Un IDE comme IntelliJ IDEA ou Eclipse</li>
      </ul>
      
      <h2>Étape 1 : Initialiser le projet</h2>
      <p>Utilisez Spring Initializr (https://start.spring.io/) pour créer un nouveau projet avec les dépendances suivantes :</p>
      <ul>
        <li>Spring Web</li>
        <li>Spring Data JPA</li>
        <li>H2 Database (pour le développement)</li>
        <li>Spring Security</li>
        <li>Lombok (optionnel, mais recommandé)</li>
      </ul>
      
      <h2>Étape 2 : Créer les modèles de données</h2>
      <p>Commencez par définir vos entités JPA. Par exemple, pour une application de gestion de produits :</p>
      
      <pre><code>
      @Entity
      @Data
      public class Product {
          @Id
          @GeneratedValue(strategy = GenerationType.IDENTITY)
          private Long id;
          
          @NotBlank
          private String name;
          
          private String description;
          
          @Positive
          private BigDecimal price;
          
          @CreatedDate
          private LocalDateTime createdAt;
          
          @LastModifiedDate
          private LocalDateTime updatedAt;
      }
      </code></pre>
      
      <h2>Étape 3 : Créer les repositories</h2>
      <p>Spring Data JPA simplifie l'accès aux données :</p>
      
      <pre><code>
      public interface ProductRepository extends JpaRepository<Product, Long> {
          List<Product> findByNameContaining(String name);
      }
      </code></pre>
      
      <h2>Étape 4 : Créer les services</h2>
      <p>La couche service contient la logique métier :</p>
      
      <pre><code>
      @Service
      @RequiredArgsConstructor
      public class ProductService {
          private final ProductRepository productRepository;
          
          public List<Product> getAllProducts() {
              return productRepository.findAll();
          }
          
          public Product getProductById(Long id) {
              return productRepository.findById(id)
                  .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
          }
          
          public Product createProduct(Product product) {
              return productRepository.save(product);
          }
          
          // Autres méthodes...
      }
      </code></pre>
      
      <h2>Étape 5 : Créer les contrôleurs REST</h2>
      <p>Les contrôleurs exposent les endpoints de l'API :</p>
      
      <pre><code>
      @RestController
      @RequestMapping("/api/products")
      @RequiredArgsConstructor
      public class ProductController {
          private final ProductService productService;
          
          @GetMapping
          public List<Product> getAllProducts() {
              return productService.getAllProducts();
          }
          
          @GetMapping("/{id}")
          public Product getProductById(@PathVariable Long id) {
              return productService.getProductById(id);
          }
          
          @PostMapping
          @ResponseStatus(HttpStatus.CREATED)
          public Product createProduct(@Valid @RequestBody Product product) {
              return productService.createProduct(product);
          }
          
          // Autres endpoints...
      }
      </code></pre>
      
      <h2>Étape 6 : Ajouter la sécurité</h2>
      <p>Configurez Spring Security pour protéger votre API :</p>
      
      <pre><code>
      @Configuration
      @EnableWebSecurity
      public class SecurityConfig {
          
          @Bean
          public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
              http
                  .csrf().disable()
                  .authorizeRequests()
                  .antMatchers("/api/auth/**").permitAll()
                  .anyRequest().authenticated()
                  .and()
                  .httpBasic();
              
              return http.build();
          }
          
          // Autres configurations...
      }
      </code></pre>
      
      <h2>Conclusion</h2>
      <p>Vous avez maintenant une API RESTful fonctionnelle avec Spring Boot ! Cette base peut être étendue avec des fonctionnalités comme la pagination, le filtrage, la documentation avec Swagger, et bien plus encore.</p>
      
      <p>N'oubliez pas de tester votre API et de mettre en place un système de logging approprié pour faciliter le débogage et la maintenance.</p>
    `,
    date: "10 avril 2024",
    author: "Mohamed El Haddadi",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Spring Boot",
    tags: ["Java", "Spring Boot", "REST API", "Backend"],
    coverImage: "/blog/spring-boot-api.jpg",
    readTime: 12,
    likes: 38,
    comments: [
      {
        author: "Marie Martin",
        content: "Super tutoriel ! J'ai pu créer mon API en suivant ces étapes.",
        date: "11 avril 2024",
      },
      {
        author: "Thomas Dubois",
        content: "Comment gérer les erreurs de validation dans cette architecture ?",
        date: "12 avril 2024",
      },
    ],
  },
  {
    title: "Introduction à Docker pour les développeurs Java",
    slug: "introduction-docker-developpeurs-java",
    excerpt:
      "Apprenez à conteneuriser vos applications Java avec Docker pour simplifier le déploiement et améliorer la portabilité.",
    content: `
      <p>Docker a révolutionné la façon dont nous déployons et gérons les applications. Pour les développeurs Java, Docker offre une solution élégante aux problèmes de "ça marche sur ma machine" et simplifie considérablement les processus de déploiement.</p>
      
      <h2>Pourquoi utiliser Docker avec Java ?</h2>
      <p>Docker permet de :</p>
      <ul>
        <li>Garantir la cohérence entre les environnements de développement, de test et de production</li>
        <li>Simplifier l'intégration continue et le déploiement continu (CI/CD)</li>
        <li>Isoler les dépendances et éviter les conflits</li>
        <li>Optimiser l'utilisation des ressources par rapport aux machines virtuelles traditionnelles</li>
      </ul>
      
      <h2>Créer un Dockerfile pour une application Java</h2>
      <p>Voici un exemple de Dockerfile pour une application Spring Boot :</p>
      
      <pre><code>
      # Utiliser l'image de base OpenJDK
      FROM eclipse-temurin:17-jdk-alpine
      
      # Définir le répertoire de travail
      WORKDIR /app
      
      # Copier le JAR de l'application
      COPY target/*.jar app.jar
      
      # Exposer le port sur lequel l'application s'exécute
      EXPOSE 8080
      
      # Commande pour exécuter l'application
      ENTRYPOINT ["java", "-jar", "app.jar"]
      </code></pre>
      
      <h2>Optimiser les images Docker pour Java</h2>
      <p>Pour créer des images plus légères et plus efficaces :</p>
      
      <h3>1. Utiliser des images de base Alpine</h3>
      <p>Les images basées sur Alpine Linux sont beaucoup plus légères que les images standard.</p>
      
      <h3>2. Implémenter le multi-stage build</h3>
      <p>Le multi-stage build permet de séparer la compilation et l'exécution :</p>
      
      <pre><code>
      # Stage de build
      FROM maven:3.8-openjdk-17 AS build
      WORKDIR /app
      COPY pom.xml .
      COPY src ./src
      RUN mvn clean package -DskipTests
      
      # Stage d'exécution
      FROM eclipse-temurin:17-jre-alpine
      WORKDIR /app
      COPY --from=build /app/target/*.jar app.jar
      EXPOSE 8080
      ENTRYPOINT ["java", "-jar", "app.jar"]
      </code></pre>
      
      <h3>3. Utiliser des JRE au lieu des JDK</h3>
      <p>Pour l'exécution, vous n'avez besoin que du JRE, pas du JDK complet.</p>
      
      <h3>4. Optimiser les options de la JVM</h3>
      <p>Ajustez les paramètres de la JVM pour les conteneurs :</p>
      
      <pre><code>
      ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
      </code></pre>
      
      <h2>Docker Compose pour les applications Java multi-conteneurs</h2>
      <p>Pour les applications qui nécessitent plusieurs services (comme une base de données), Docker Compose est idéal :</p>
      
      <pre><code>
      version: '3.8'
      services:
        app:
          build: .
          ports:
            - "8080:8080"
          depends_on:
            - db
          environment:
            - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
            - SPRING_DATASOURCE_USERNAME=postgres
            - SPRING_DATASOURCE_PASSWORD=password
        
        db:
          image: postgres:14-alpine
          ports:
            - "5432:5432"
          environment:
            - POSTGRES_DB=mydb
            - POSTGRES_USER=postgres
            - POSTGRES_PASSWORD=password
          volumes:
            - postgres-data:/var/lib/postgresql/data
      
      volumes:
        postgres-data:
      </code></pre>
      
      <h2>Bonnes pratiques pour les applications Java conteneurisées</h2>
      <ul>
        <li>Créez des images immuables et traitez les conteneurs comme éphémères</li>
        <li>Externalisez la configuration via des variables d'environnement</li>
        <li>Implémentez des health checks pour faciliter l'orchestration</li>
        <li>Utilisez des volumes pour les données persistantes</li>
        <li>Minimisez le nombre de couches dans vos images</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Docker offre aux développeurs Java un moyen puissant de standardiser les environnements de développement et de simplifier les déploiements. En suivant ces bonnes pratiques, vous pouvez tirer pleinement parti de la conteneurisation pour vos applications Java.</p>
    `,
    date: "5 avril 2024",
    author: "Mohamed El Haddadi",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "DevOps",
    tags: ["Docker", "Java", "Conteneurisation", "DevOps"],
    coverImage: "/blog/docker-java.jpg",
    readTime: 10,
    likes: 56,
    comments: [],
  },
]
