window.GFG_DEVOPS_QUESTIONS = [
  {
    sourceNumber: 1,
    question: "What do you understand by DevOps?",
    answer: "DevOps is a culture and set of practices that joins software development and operations to deliver changes quickly and reliably. It emphasizes collaboration, automation, CI/CD, infrastructure as code, observability, and continuous feedback.",
    example: "A commit triggers automated tests, builds an image, deploys it to staging, runs checks, and then promotes the same artifact to production."
  },
  {
    sourceNumber: 2,
    question: "What is a DevOps Engineer?",
    answer: "A DevOps engineer improves the path from source code to reliable production operation. The work commonly includes CI/CD, cloud infrastructure, automation, containers, monitoring, security controls, and incident support.",
    example: "The engineer creates a reusable deployment pipeline, manages infrastructure with Terraform, and adds alerts and rollback procedures."
  },
  {
    sourceNumber: 3,
    question: "What are the top programming and scripting languages which is important to learn too become DevOps Engineer?",
    answer: "Bash and Python are common for automation, while PowerShell is useful in Windows environments. Go, Java, Ruby, or Groovy may matter depending on the platform and tools, but understanding operating systems and APIs is more important than collecting languages.",
    example: "Use Bash for a small deployment script, Python for a larger cloud automation tool, and Groovy when maintaining a Jenkins pipeline."
  },
  {
    sourceNumber: 4,
    question: "What is the use of SSH?",
    answer: "SSH provides encrypted remote login, command execution, file transfer, tunneling, and machine authentication over an untrusted network. Key-based authentication is preferred for automation.",
    example: "A deployment runner uses a restricted SSH key to connect to a server and restart one service without exposing a password."
  },
  {
    sourceNumber: 5,
    question: "What is CI/CD?",
    answer: "Continuous Integration frequently merges code and automatically builds and tests it. Continuous Delivery keeps every validated change deployable with a release decision, while Continuous Deployment automatically releases every qualifying change.",
    example: "A pull request runs linting and tests; merging builds one immutable image and deploys it automatically after approval or policy checks."
  },
  {
    sourceNumber: 6,
    question: "What is the difference between Horizontal and Vertical Scaling?",
    answer: "Vertical scaling adds CPU, memory, or storage to one machine. Horizontal scaling adds more machines or instances, which can improve capacity and fault tolerance but requires load balancing and distributed-system design.",
    example: "Upgrade one database server from 8 GB to 32 GB RAM for vertical scaling, or run six stateless API replicas behind a load balancer for horizontal scaling."
  },
  {
    sourceNumber: 7,
    question: "What is the Blue/Green Deployment Pattern?",
    answer: "Blue/Green deployment maintains two equivalent environments. One serves production while the new version is validated in the other; traffic switches only after checks pass, and rollback switches traffic back.",
    example: "Blue serves version 1, Green receives version 2 and smoke tests, then the load balancer moves traffic to Green."
  },
  {
    sourceNumber: 8,
    question: "What's the difference between DevOps & Agile?",
    answer: "Agile organizes iterative product development and feedback. DevOps extends fast feedback across development, release, infrastructure, and production operations; the approaches complement each other.",
    example: "A team plans two-week increments with Agile and uses DevOps automation to test, deploy, observe, and improve each increment."
  },
  {
    sourceNumber: 9,
    question: "What is the continuous testing process?",
    answer: "Continuous testing runs automated checks throughout the delivery pipeline instead of waiting for one late testing phase. Tests are layered by speed and risk, and a failure stops promotion.",
    example: "Run unit tests on every commit, integration tests after building, security scans before release, and smoke tests after deployment."
  },
  {
    sourceNumber: 10,
    question: "What is the role of AWS in DevOps?",
    answer: "AWS supplies programmable infrastructure and managed services for compute, storage, networking, containers, CI/CD, security, and observability. DevOps teams automate these services through APIs and infrastructure as code.",
    example: "Terraform creates a VPC and ECS service, CodePipeline deploys an image, IAM limits access, and CloudWatch records metrics and logs."
  },
  {
    sourceNumber: 11,
    question: "What do you mean by Configuration Management?",
    answer: "Configuration management defines and enforces the desired state of servers, applications, and settings in a repeatable way. It reduces configuration drift and makes changes reviewable and reproducible.",
    example: "An Ansible playbook ensures every server has the required package version, service configuration, user permissions, and running process."
  },
  {
    sourceNumber: 12,
    question: "What is Infrastructure as Code (IaC)?",
    answer: "Infrastructure as Code manages infrastructure through version-controlled definitions rather than manual console changes. Plans can be reviewed, tested, repeated across environments, and audited.",
    example: "A Terraform module creates the same network, database, and service layout for staging and production using different variables."
  },
  {
    sourceNumber: 13,
    question: "Explain the concept of branching in Git.",
    answer: "A Git branch is a movable reference to a commit that lets work proceed independently from another line of development. Teams merge or rebase completed work according to their workflow.",
    example: "Create a feature branch from main, commit changes, open a pull request, pass checks, and merge it back into main."
  },
  {
    sourceNumber: 14,
    question: "What is Git stash?",
    answer: "Git stash temporarily saves uncommitted tracked changes and restores the working tree, allowing a developer to switch tasks without making an unfinished commit. Stashes are local and should not replace normal commits.",
    example: "Stash unfinished UI changes, switch to a production-fix branch, then return and apply the stash."
  },
  {
    sourceNumber: 15,
    question: "What is a GIT Repository?",
    answer: "A Git repository stores project files together with commits, branches, tags, and other version-control metadata. It may be local or synchronized with a remote repository.",
    example: "Cloning a repository creates a local working tree and a .git directory containing its history and references."
  },
  {
    sourceNumber: 16,
    question: "Name three important DevOps KPIs",
    answer: "Three current DORA delivery metrics are deployment frequency, change lead time, and change fail rate. DORA also tracks failed deployment recovery time and deployment rework rate, grouping the five measures into software-delivery throughput and instability.",
    example: "Track how often releases occur, what percentage cause incidents, and how quickly service is restored after a failed change."
  },
  {
    sourceNumber: 17,
    question: "What Is Jenkins?",
    answer: "Jenkins is an open-source automation server commonly used to implement build, test, and deployment pipelines. Its Pipeline as Code model stores workflow logic in a Jenkinsfile.",
    example: "A Jenkinsfile checks out code, runs tests in parallel, builds a Docker image, scans it, and deploys an approved version."
  },
  {
    sourceNumber: 18,
    question: "What is the use of the cherry-pick command in git?",
    answer: "Git cherry-pick applies the changes introduced by selected commit or commits onto the current branch. It is useful for targeted fixes but can duplicate history if overused.",
    example: "Apply one verified hotfix commit from a development branch to the production branch without merging unrelated work."
  },
  {
    sourceNumber: 19,
    question: "What is sudo command in Linux?",
    answer: "sudo runs an allowed command with another user's privileges, commonly root, according to policy. It supports least privilege and auditing better than routinely logging in as root.",
    example: "Permit a deployment user to restart one service with sudo while denying unrestricted administrative access."
  },
  {
    sourceNumber: 20,
    question: "What's the Difference Between Git Fetch and Git Pull ?",
    answer: "git fetch downloads remote commits and updates remote-tracking branches without changing the current branch. git pull fetches and then integrates the remote changes using merge or rebase.",
    example: "Fetch first to inspect origin/main; pull when you intentionally want those changes integrated into the checked-out branch."
  },
  {
    sourceNumber: 21,
    question: "What are the components of Selenium?",
    answer: "The main Selenium components are WebDriver for browser automation, Grid for distributed and parallel execution, and IDE for recording and replaying simple browser flows.",
    example: "Run WebDriver tests against Chrome and Firefox nodes through Selenium Grid in a CI pipeline."
  },
  {
    sourceNumber: 22,
    question: "What is a Puppet in DevOps?",
    answer: "Puppet is a configuration-management tool that declares the desired state of infrastructure and enforces it repeatedly. It commonly uses a server-agent architecture, though agentless options also exist.",
    example: "A Puppet manifest ensures a package is installed, a configuration file has approved content, and the service remains running."
  },
  {
    sourceNumber: 23,
    question: "What is Ansible?",
    answer: "Ansible is an automation and configuration-management tool that commonly connects over SSH and describes tasks in YAML playbooks. It is agentless for typical Linux management.",
    example: "A playbook updates application packages across a server group one batch at a time and verifies service health."
  },
  {
    sourceNumber: 24,
    question: "What is Automation Testing?",
    answer: "Automation testing uses scripts and tools to execute repeatable checks, compare actual and expected results, and report failures. It improves feedback speed but does not eliminate exploratory testing.",
    example: "A CI pipeline runs API regression tests after every merge and blocks deployment if a critical scenario fails."
  },
  {
    sourceNumber: 25,
    question: "What is the importance of continuous feedback in DevOps?",
    answer: "Continuous feedback uses test results, deployment signals, user behavior, incidents, and operational metrics to improve both the product and delivery process. Fast feedback reduces the cost of detecting and correcting mistakes.",
    example: "An error-rate alert links a regression to the latest release, prompting an automatic rollback and a new test for that failure."
  },
  {
    sourceNumber: 26,
    question: "What is Git Bash?",
    answer: "Git Bash provides Git commands and a Bash-like shell environment on Windows. It lets Windows users run many familiar Unix-style commands and shell scripts.",
    example: "Use Git Bash on Windows to run git commands, SSH into a server, and execute a repository's Bash setup script."
  },
  {
    sourceNumber: 27,
    question: "What is Git Squashing?",
    answer: "Squashing combines multiple commits into one commit, usually before merging, to create a clearer project history. It should be used carefully on shared branches because rewriting published history disrupts collaborators.",
    example: "Combine five small fix-up commits into one focused feature commit during interactive rebase before opening the final pull request."
  },
  {
    sourceNumber: 29,
    question: "What is a merge conflict in Git?",
    answer: "A merge conflict occurs when Git cannot automatically reconcile competing changes. A developer must inspect the conflict markers, choose the intended content, test it, stage the resolution, and continue the operation.",
    example: "Two branches edit the same lines of a configuration file differently, so Git asks the developer to resolve the final value."
  },
  {
    sourceNumber: 30,
    question: "What is Git prune?",
    answer: "git prune removes unreachable Git objects that are no longer referenced and have passed the expiry rules. It is normally invoked through git gc rather than run directly during everyday work.",
    example: "Repository garbage collection eventually removes orphaned objects left after old rewritten history expires."
  },
  {
    sourceNumber: 31,
    question: "What's the difference between HTTP and HTTPS?",
    answer: "HTTPS is HTTP carried over TLS. It encrypts traffic, verifies server identity through certificates, and protects message integrity; plain HTTP provides none of those protections.",
    example: "Login credentials sent over HTTPS are encrypted in transit, while the same request over HTTP can be read or modified by an attacker on the path."
  },
  {
    sourceNumber: 32,
    question: "What are Virtual machines (VMs) ?",
    answer: "A virtual machine emulates a computer with virtual CPU, memory, disks, and networking while running its own guest operating system through a hypervisor. VMs provide strong isolation but are heavier than containers.",
    example: "One physical server can host separate Linux and Windows VMs, each with independent kernels and allocated resources."
  },
  {
    sourceNumber: 33,
    question: "What is the difference between Continuous Deployment and Continuous Delivery?",
    answer: "Continuous Delivery automatically validates changes and keeps them ready for release, but production promotion may require a human decision. Continuous Deployment automatically releases every change that passes the pipeline.",
    example: "A bank may require approval after automated checks, while a low-risk web service may deploy every passing change automatically."
  },
  {
    sourceNumber: 34,
    question: "Explain the different phases in DevOps methodology.",
    answer: "A common DevOps lifecycle includes planning, coding, building, testing, releasing, deploying, operating, monitoring, and feeding results back into planning. Automation and collaboration connect the phases into a loop.",
    example: "An incident found during monitoring creates a backlog item, a code fix, new tests, a release, and improved alerts."
  },
  {
    sourceNumber: 35,
    question: "What are antipatterns in devops and how to avoid them?",
    answer: "DevOps antipatterns include isolated DevOps teams, manual production changes, tool adoption without process change, shared administrator access, weak testing, and ignored feedback. Avoid them with shared ownership, automation, version control, least privilege, measurable outcomes, and blameless learning.",
    example: "Replace undocumented server fixes with reviewed infrastructure code and a pipeline that applies the same change consistently."
  },
  {
    sourceNumber: 36,
    question: "What is Component-Based Model (CBM) in DevOps?",
    answer: "A component-based model builds a system from independently developed and reusable components with clear interfaces. In delivery, components can be built, tested, versioned, and deployed through repeatable pipelines.",
    example: "A shared authentication component is versioned and tested once, then consumed by several services through a stable interface."
  },
  {
    sourceNumber: 37,
    question: "How to Make a CI-CD Pipeline in Jenkins?",
    answer: "Connect Jenkins to source control, store stages in a Jenkinsfile, configure credentials securely, and define build, test, scan, package, deploy, and verification steps. Add approvals, artifact promotion, notifications, and rollback based on release risk.",
    example: "A webhook starts the pipeline, tests the app, builds and scans an image, pushes it to a registry, deploys staging, and promotes after approval."
  },
  {
    sourceNumber: 38,
    question: "What's the difference between Chef and Puppet?",
    answer: "Both automate configuration management. Chef traditionally uses Ruby-based recipes and a procedural style, while Puppet commonly uses a declarative language describing desired state; architecture and workflow choices vary by deployment.",
    example: "A Chef recipe describes installation steps, while a Puppet manifest declares that the package, file, and service must have specified states."
  },
  {
    sourceNumber: 39,
    question: "What is Git Rebase?",
    answer: "Git rebase reapplies commits onto a new base, producing a linear-looking history with new commit identities. Avoid rebasing shared published history unless the team coordinates the rewrite.",
    example: "Rebase a private feature branch onto the latest main before opening a pull request, resolve conflicts, and force-push only that private branch safely."
  },
  {
    sourceNumber: 40,
    question: "What is Selenium Tool Suite?",
    answer: "The Selenium suite is a collection of browser-automation tools, mainly WebDriver, Grid, and IDE. Together they support scripted, recorded, local, remote, and parallel web testing.",
    example: "WebDriver implements tests, Grid distributes them across browser environments, and IDE records a quick reproduction flow."
  },
  {
    sourceNumber: 41,
    question: "What is Selenium IDE?",
    answer: "Selenium IDE is a browser extension for recording, editing, and replaying browser interactions. It is useful for prototypes and simple tests but is less maintainable than a structured WebDriver test suite for complex systems.",
    example: "Record a login flow to reproduce a bug, then convert important long-term coverage into maintainable WebDriver code."
  },
  {
    sourceNumber: 42,
    question: "What is Banker’s Algorithm in OS?",
    answer: "Banker's Algorithm is a deadlock-avoidance algorithm that grants a resource request only if the system can remain in a safe state where every process can eventually finish. It requires each process's maximum resource demand in advance.",
    example: "Before allocating resources, simulate the allocation and verify that a safe completion sequence still exists."
  },
  {
    sourceNumber: 43,
    question: "How do you create a backup and copy files in Jenkins?",
    answer: "I back up Jenkins configuration, job definitions, credentials, plugin information, and build metadata from JENKINS_HOME with a controlled snapshot or backup plugin. I protect secrets, test the restoration process, and keep pipeline definitions in source control when possible.",
    example: "Take an encrypted volume snapshot of JENKINS_HOME, export plugin versions, and restore the backup in an isolated environment to verify it."
  },
  {
    sourceNumber: 44,
    question: "Explain how you can set up a Jenkins job?",
    answer: "I create a pipeline job, connect the repository and credentials, configure a webhook or schedule, point the job to a Jenkinsfile, assign suitable agents, and set permissions, parameters, artifacts, and notifications. I inspect the first build before enabling production actions.",
    example: "A multibranch pipeline automatically discovers branches and pull requests and executes the Jenkinsfile stored with each branch."
  },
  {
    sourceNumber: 45,
    question: "Explain the architecture of Docker.",
    answer: "Docker uses a client-server architecture. The client calls the Docker daemon, which builds images and manages containers, networks, and volumes; registries store and distribute layered images.",
    example: "docker run asks the daemon to pull an image if needed, create container storage and networking, and start the isolated process."
  },
  {
    sourceNumber: 46,
    question: "What is the DevOps life cycle?",
    answer: "The DevOps lifecycle is a continuous loop of planning, development, integration, testing, delivery, deployment, operation, monitoring, and feedback. Each phase supplies information that improves the next change.",
    example: "Production latency data leads to a code optimization, automated performance tests, deployment, and validation against the same metric."
  },
  {
    sourceNumber: 47,
    question: "What is the difference between Git Merge and Git Rebase?",
    answer: "Merge combines histories and usually creates a merge commit without rewriting existing commits. Rebase reapplies commits onto another base for a linear history but changes commit IDs.",
    example: "Merge a shared feature branch to preserve collaboration history; rebase a private branch to update it cleanly before review."
  },
  {
    sourceNumber: 48,
    question: "What's the difference between DataOps and DevOps?",
    answer: "DevOps improves software delivery and operation. DataOps applies similar automation, collaboration, quality, versioning, and observability principles to data pipelines, transformations, schemas, and analytics products.",
    example: "DevOps validates and deploys an API; DataOps validates source freshness and schema quality before promoting a data transformation pipeline."
  },
  {
    sourceNumber: 49,
    question: "What are the 7Cs of DevOps?",
    answer: "The 7 Cs are not a universal DevOps standard. A common interview list is Continuous Development, Integration, Testing, Deployment, Monitoring, Feedback, and Operations, but some sources substitute Delivery or separate Delivery and Deployment, so I would clarify the convention being used.",
    example: "A code change is integrated and tested, kept ready for delivery, deployed, monitored in production, and converted into feedback while operations maintain service reliability."
  },
  {
    sourceNumber: 50,
    question: "Explain the “Shift left to reduce failure” concept in DevOps?",
    answer: "Shift left moves quality, security, operability, and architecture checks earlier in development. Earlier feedback makes defects cheaper to fix and reduces risky discoveries during deployment.",
    example: "Run dependency scanning and infrastructure-policy checks in the pull request instead of discovering violations during production release."
  },
  {
    sourceNumber: 51,
    question: "Explain the concept of Infrastructure as Code (IaC) and discuss the benefits and challenges of implementing IaC in a large-scale production environment.",
    answer: "IaC represents infrastructure in version-controlled definitions. It improves repeatability, review, auditability, disaster recovery, and environment consistency; large-scale challenges include state management, module governance, secrets, drift, provider changes, testing, and safe rollout.",
    example: "Use reviewed Terraform modules, remote locked state, policy checks, plan approval, staged rollout, drift detection, and tested rollback procedures."
  },
  {
    sourceNumber: 52,
    question: "What strategies can be employed to achieve zero-downtime deployments, and how does the Blue/Green Deployment pattern fit into these strategies?",
    answer: "Zero-downtime strategies include rolling updates, Blue/Green, canary releases, readiness checks, connection draining, backward-compatible APIs, and expand-contract database migrations. Blue/Green validates a complete parallel environment before switching traffic and enables fast traffic rollback.",
    example: "Add a nullable database column first, deploy compatible code to Green, run smoke tests, switch traffic, and retain Blue until health is confirmed."
  },
  {
    sourceNumber: 53,
    question: "How do you ensure security and compliance in a CI/CD pipeline, particularly when integrating with multiple cloud providers and third-party services?",
    answer: "I secure the pipeline with short-lived workload identities, least privilege, isolated runners, signed artifacts, protected branches, secret managers, security scanning, policy as code, approval gates, audit logs, and controlled third-party access. I apply equivalent controls across providers through a common policy layer.",
    example: "The pipeline exchanges an OIDC token for temporary cloud credentials, signs the image, verifies policy, records approvals, and never stores permanent cloud keys."
  },
  {
    sourceNumber: 54,
    question: "Discuss the importance of monitoring and logging in a DevOps environment. What tools and practices do you recommend for effective observability and incident management?",
    answer: "Observability combines metrics, logs, traces, and profiles. I would instrument with OpenTelemetry, visualize and alert with tools such as Prometheus and Grafana, centralize logs and traces, alert on SLO or user impact, and support incidents with correlation IDs, runbooks, clear roles, and blameless reviews.",
    example: "Prometheus detects rising error rate, Grafana shows the affected service, centralized logs expose the exception, and a trace identifies the slow dependency."
  },
  {
    sourceNumber: 55,
    question: "Explain the concept of immutable infrastructure and how it contrasts with traditional infrastructure management. What are the benefits and potential drawbacks of adopting immutable infrastructure in a DevOps workflow?",
    answer: "Immutable infrastructure replaces deployed instances or images instead of modifying them in place. It reduces drift and improves reproducibility and rollback, but requires image pipelines, externalized state, deployment capacity, and careful handling of long-running workloads.",
    example: "Build a patched machine image, replace instances gradually behind a load balancer, and roll back by restoring the previous image version."
  },
  {
    sourceNumber: 56,
    question: "Explain the concept of serverless computing and its implications for DevOps practices.",
    answer: "Serverless computing lets a provider manage servers and scaling while teams deploy functions or managed application units and pay largely by usage. DevOps work shifts toward event design, permissions, observability, deployment packaging, limits, cold starts, and vendor-managed reliability boundaries.",
    example: "A function processes uploaded files automatically, while the pipeline versions its package, IAM policy, event trigger, alarms, and rollback alias."
  },
  {
    sourceNumber: 57,
    question: "What are Blue-Green and Canary Deployments in DevOps?",
    answer: "Blue-Green switches traffic between two complete environments. Canary deployment sends a small percentage of traffic to the new version first and increases exposure only when health metrics remain acceptable.",
    example: "Blue-Green swaps all traffic after validation; canary sends 5%, then 25%, then 100% while checking errors and latency at each step."
  },
  {
    sourceNumber: 58,
    question: "How do you optimize a Docker container for performance?",
    answer: "I optimize a Docker container with a minimal trusted base image, multi-stage builds, a strict .dockerignore, cached dependency layers, production-only dependencies, one main process, non-root execution, resource limits, and efficient startup. I measure image size and runtime behavior instead of optimizing blindly.",
    example: "Compile in a builder stage and copy only the binary and required runtime files into a small final image."
  },
  {
    sourceNumber: 59,
    question: "How do you handle rollbacks in Kubernetes?",
    answer: "I deploy immutable, versioned images through a Deployment and monitor rollout status and health probes. If checks fail, I use rollout undo or redeploy a known-good manifest. I keep database changes backward compatible because Kubernetes cannot automatically reverse external state.",
    example: "kubectl rollout undo restores the previous ReplicaSet after error-rate checks fail, while an expand-contract migration keeps both versions compatible."
  },
  {
    sourceNumber: 60,
    question: "How do you optimize a CI/CD pipeline for faster deployments?",
    answer: "I first profile each stage, then cache dependencies safely, parallelize independent checks, use incremental builds, reuse one verified artifact, right-size runners, and avoid repeating unchanged work. I keep fast pull-request checks separate from slower suites without removing critical quality gates.",
    example: "Parallelize unit and security tests, cache package downloads by lockfile hash, and promote the same scanned image instead of rebuilding per environment."
  },
  {
    sourceNumber: 61,
    question: "What are Sidecar Containers in Kubernetes?",
    answer: "A sidecar is a helper container that runs in the same Pod as the main application and shares its network and selected volumes. It provides supporting behavior without embedding that behavior in the application process.",
    example: "A sidecar proxies outbound traffic, refreshes local configuration, or ships logs while the main container focuses on application logic."
  },
  {
    sourceNumber: 62,
    question: "How are monolithic,SOA and microservices architecture different?",
    answer: "A monolith deploys most functionality as one unit. SOA organizes reusable enterprise services, often with centralized integration, while microservices favor smaller independently deployable services, decentralized ownership, and lightweight communication; each adds different operational complexity.",
    example: "A monolith releases one application, SOA may integrate business services through an enterprise bus, and microservices deploy catalog and payment services independently."
  }
];
