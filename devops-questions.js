// Stable original numbers are retained after the fresher-SDE scope reduction.
window.GFG_DEVOPS_QUESTIONS = [
  {
    "number": 348,
    "sourceNumber": 1,
    "question": "What do you understand by DevOps?",
    "answer": "DevOps is a culture and set of practices that joins software development and operations to deliver changes quickly and reliably. It emphasizes collaboration, automation, CI/CD, infrastructure as code, observability, and continuous feedback."
  },
  {
    "number": 351,
    "sourceNumber": 4,
    "question": "What is the use of SSH?",
    "answer": "SSH provides encrypted remote login, command execution, file transfer, tunneling, and machine authentication over an untrusted network. Key-based authentication is preferred for automation."
  },
  {
    "number": 352,
    "sourceNumber": 5,
    "question": "What is CI/CD?",
    "answer": "Continuous Integration frequently merges code and automatically builds and tests it. Continuous Delivery keeps every validated change deployable with a release decision, while Continuous Deployment automatically releases every qualifying change."
  },
  {
    "number": 353,
    "sourceNumber": 6,
    "question": "What is the difference between Horizontal and Vertical Scaling?",
    "answer": "Vertical scaling adds CPU, memory, or storage to one machine. Horizontal scaling adds more machines or instances, which can improve capacity and fault tolerance but requires load balancing and distributed-system design."
  },
  {
    "number": 359,
    "sourceNumber": 12,
    "question": "What is Infrastructure as Code (IaC)?",
    "answer": "Infrastructure as Code manages infrastructure through version-controlled definitions rather than manual console changes. Plans can be reviewed, tested, repeated across environments, and audited."
  },
  {
    "number": 360,
    "sourceNumber": 13,
    "question": "Explain the concept of branching in Git.",
    "answer": "A Git branch is a movable reference to a commit that lets work proceed independently from another line of development. Teams merge or rebase completed work according to their workflow."
  },
  {
    "number": 361,
    "sourceNumber": 14,
    "question": "What is Git stash?",
    "answer": "Git stash temporarily saves uncommitted tracked changes and restores the working tree, allowing a developer to switch tasks without making an unfinished commit. Stashes are local and should not replace normal commits."
  },
  {
    "number": 362,
    "sourceNumber": 15,
    "question": "What is a GIT Repository?",
    "answer": "A Git repository stores project files together with commits, branches, tags, and other version-control metadata. It may be local or synchronized with a remote repository."
  },
  {
    "number": 365,
    "sourceNumber": 18,
    "question": "What is the use of the cherry-pick command in git?",
    "answer": "Git cherry-pick applies the changes introduced by selected commit or commits onto the current branch. It is useful for targeted fixes but can duplicate history if overused."
  },
  {
    "number": 366,
    "sourceNumber": 19,
    "question": "What is sudo command in Linux?",
    "answer": "sudo runs an allowed command with another user's privileges, commonly root, according to policy. It supports least privilege and auditing better than routinely logging in as root."
  },
  {
    "number": 367,
    "sourceNumber": 20,
    "question": "What's the difference between Git fetch and Git pull?",
    "answer": "git fetch downloads remote commits and updates remote-tracking branches without changing the current branch. git pull fetches and then integrates the remote changes using merge or rebase."
  },
  {
    "number": 371,
    "sourceNumber": 24,
    "question": "What is Automation Testing?",
    "answer": "Automation testing uses scripts and tools to execute repeatable checks, compare actual and expected results, and report failures. It improves feedback speed but does not eliminate exploratory testing."
  },
  {
    "number": 374,
    "sourceNumber": 27,
    "question": "What is Git Squashing?",
    "answer": "Squashing combines multiple commits into one commit, usually before merging, to create a clearer project history. It should be used carefully on shared branches because rewriting published history disrupts collaborators."
  },
  {
    "number": 375,
    "sourceNumber": 29,
    "question": "What is a merge conflict in Git?",
    "answer": "A merge conflict occurs when Git cannot automatically reconcile competing changes. A developer must inspect the conflict markers, choose the intended content, test it, stage the resolution, and continue the operation."
  },
  {
    "number": 378,
    "sourceNumber": 32,
    "question": "What are virtual machines (VMs)?",
    "answer": "A virtual machine emulates a computer with virtual CPU, memory, disks, and networking while running its own guest operating system through a hypervisor. VMs provide strong isolation but are heavier than containers."
  },
  {
    "number": 379,
    "sourceNumber": 33,
    "question": "What is the difference between Continuous Deployment and Continuous Delivery?",
    "answer": "Continuous Delivery automatically validates changes and keeps them ready for release, but production promotion may require a human decision. Continuous Deployment automatically releases every change that passes the pipeline."
  },
  {
    "number": 388,
    "sourceNumber": 42,
    "question": "What is Banker’s Algorithm in OS?",
    "answer": "Banker's Algorithm is a deadlock-avoidance algorithm that grants a resource request only if the system can remain in a safe state where every process can eventually finish. It requires each process's maximum resource demand in advance."
  },
  {
    "number": 391,
    "sourceNumber": 45,
    "question": "Explain the architecture of Docker.",
    "answer": "Docker uses a client-server architecture. The client calls the Docker daemon, which builds images and manages containers, networks, and volumes; registries store and distribute layered images."
  },
  {
    "number": 393,
    "sourceNumber": 47,
    "question": "What is the difference between Git Merge and Git Rebase?",
    "answer": "Merge combines histories and usually creates a merge commit without rewriting existing commits. Rebase reapplies commits onto another base for a linear history but changes commit IDs."
  },
  {
    "number": 408,
    "sourceNumber": 62,
    "question": "How are monolithic, SOA, and microservices architectures different?",
    "answer": "A monolith deploys most functionality as one unit. SOA organizes reusable enterprise services, often with centralized integration, while microservices favor smaller independently deployable services, decentralized ownership, and lightweight communication; each adds different operational complexity."
  }
];
