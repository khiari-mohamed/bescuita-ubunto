export interface SlideData {
  id: number;
  type: 'cover' | 'toc' | 'content' | 'diagram' | 'table' | 'terminal' | 'conclusion' | 'thankyou';
  title: string;
  subtitle?: string;
  content?: any;
  authors?: string[];
}

export const slidesData: SlideData[] = [
  {
    id: 1,
    type: 'cover',
    title: 'Système d\'exploitation',
    subtitle: 'Création et Exploitation d\'une Machine Virtuelle',
    authors: [
      'Boughanmi Oumayma',
      'Ben Slema Eya', 
      'Chalouf Mariem',
      'Chaabeni Ahmed'
    ]
  },
  {
    id: 2,
    type: 'toc',
    title: 'Plan de Présentation',
    content: [
      'Introduction',
      'Objectifs',
      'Concepts clés',
      'Oracle VM VirtualBox',
      'Installation',
      'Création de la VM',
      'Installation Ubuntu',
      'Tests',
      'Avantages & Limites',
      'Conclusion'
    ]
  },
  {
    id: 3,
    type: 'content',
    title: 'Introduction',
    content: {
      points: [
        'Virtualisation = exécution de plusieurs OS sur une seule machine physique',
        'Réduction des coûts matériels et augmentation de la flexibilité',
        'Largement utilisée en administration système, cloud computing, cybersécurité',
        'Objectif : environnement virtualisé avec Oracle VM VirtualBox et Ubuntu'
      ]
    }
  },
  {
    id: 4,
    type: 'content',
    title: 'Objectifs',
    content: {
      objectives: [
        { text: 'Comprendre les principes fondamentaux de la virtualisation', icon: 'Brain' },
        { text: 'Identifier le rôle et fonctionnement d\'un hyperviseur', icon: 'Cpu' },
        { text: 'Installer et configurer Oracle VM VirtualBox', icon: 'Download' },
        { text: 'Créer une machine virtuelle', icon: 'Plus' },
        { text: 'Installer et configurer Ubuntu Linux', icon: 'Terminal' },
        { text: 'Tester le fonctionnement de la VM', icon: 'CheckCircle' },
        { text: 'Produire une documentation technique complète', icon: 'FileText' }
      ]
    }
  },
  {
    id: 5,
    type: 'content',
    title: 'Concepts Clés',
    content: {
      concepts: [
        { term: 'Virtualisation', desc: 'Création de ressources informatiques virtuelles à partir d\'un seul matériel physique' },
        { term: 'Hyperviseur', desc: 'Logiciel chargé de créer, exécuter et gérer des machines virtuelles' },
        { term: 'Machine hôte', desc: 'Machine physique réelle hébergeant les VMs' },
        { term: 'Machine invitée', desc: 'Système d\'exploitation installé dans la VM' },
        { term: 'Ressources virtualisées', desc: 'VCPU, VRAM, disque virtuel (VMDK), carte réseau virtuelle' }
      ]
    }
  },
  {
    id: 6,
    type: 'diagram',
    title: 'Types d\'Hyperviseurs',
    content: {
      types: [
        {
          name: 'Type 1 (Bare Metal)',
          desc: 'S\'exécute directement sur le matériel',
          examples: ['VMware ESXi', 'Hyper-V', 'Xen']
        },
        {
          name: 'Type 2 (Hosted)',
          desc: 'S\'exécute sur un OS existant',
          examples: ['VirtualBox', 'VMware Workstation'],
          highlight: true
        }
      ]
    }
  },
  {
    id: 7,
    type: 'diagram',
    title: 'Architecture de Virtualisation',
    content: {
      architecture: 'virtualization'
    }
  },
  {
    id: 8,
    type: 'content',
    title: 'Oracle VM VirtualBox',
    subtitle: 'Hyperviseur open source d\'Oracle',
    content: {
      features: [
        { text: 'Hyperviseur de type 2 (hosted)', icon: 'Server' },
        { text: 'Open source et gratuit', icon: 'Code' },
        { text: 'Compatible multi-OS', icon: 'Monitor' },
        { text: 'Largement utilisé en pédagogie', icon: 'GraduationCap' },
        { text: 'Simple d\'utilisation', icon: 'Zap' }
      ]
    }
  },
  {
    id: 9,
    type: 'content',
    title: 'Fonctionnalités Principales',
    content: {
      points: [
        'Création et suppression de machines virtuelles (VM)',
        'Snapshot (instantané) : sauvegarde de l\'état complet d\'une VM',
        'Gestion avancée du réseau (NAT, Bridge, Host-Only)',
        'Isolation des environnements pour une meilleure sécurité',
        'Partage de dossiers entre l\'hôte et la VM',
        'Support multi-OS (Windows, Linux, macOS)'
      ]
    }
  },
  {
    id: 10,
    type: 'content',
    title: 'Prérequis Installation',
    subtitle: 'BIOS / UEFI',
    content: {
      requirements: [
        'Intel VT-x activé',
        'AMD-V activé',
        'Virtualisation activée dans le BIOS'
      ]
    }
  },
  {
    id: 11,
    type: 'content',
    title: 'Installation de VirtualBox',
    content: {
      steps: [
        'Télécharger depuis le site officiel',
        'Lancer l\'installateur',
        'Suivre l\'assistant d\'installation',
        'Accepter les paramètres par défaut',
        'Finaliser l\'installation'
      ]
    }
  },
  {
    id: 12,
    type: 'content',
    title: 'Création de la VM',
    content: {
      steps: [
        'Nouvelle machine',
        'Choix ISO Ubuntu',
        'Type Linux / Ubuntu',
        'Configuration des ressources'
      ]
    }
  },
  {
    id: 13,
    type: 'content',
    title: 'Paramètres de la VM',
    content: {
      specs: [
        { label: 'CPU', value: '2 cœurs', icon: 'Cpu' },
        { label: 'RAM', value: '4 Go', icon: 'MemoryStick' },
        { label: 'Disque', value: '40 Go', icon: 'HardDrive' },
        { label: 'Réseau', value: 'NAT', icon: 'Network' }
      ]
    }
  },
  {
    id: 14,
    type: 'content',
    title: 'Installation Ubuntu',
    content: {
      steps: [
        'Montage de l\'image ISO',
        'Démarrage de la VM',
        'Installation automatique',
        'Création utilisateur',
        'Configuration système'
      ]
    }
  },
  {
    id: 15,
    type: 'terminal',
    title: 'Démonstration et Tests',
    content: {
      commands: [
        { cmd: 'ls', desc: 'Lister les fichiers et dossiers' },
        { cmd: 'pwd', desc: 'Afficher le répertoire courant' },
        { cmd: 'uname -a', desc: 'Informations détaillées du système' }
      ]
    }
  },
  {
    id: 16,
    type: 'content',
    title: 'Avantages',
    content: {
      advantages: [
        { text: 'Économie de matériel', icon: 'DollarSign' },
        { text: 'Sécurité renforcée', icon: 'Shield' },
        { text: 'Flexibilité maximale', icon: 'Zap' },
        { text: 'Rapidité de déploiement', icon: 'Clock' }
      ]
    }
  },
  {
    id: 17,
    type: 'content',
    title: 'Limites',
    content: {
      limitations: [
        { text: 'Dépendance aux ressources matérielles', icon: 'AlertTriangle' },
        { text: 'Performances légèrement réduites', icon: 'TrendingDown' }
      ]
    }
  },
  {
    id: 18,
    type: 'conclusion',
    title: 'Conclusion Générale',
    content: {
      summary: [
        'Compréhension approfondie de la virtualisation',
        'Environnement virtualisé complet mis en œuvre',
        'Base solide pour projets futurs en administration système',
        'Compétences acquises en cloud computing'
      ]
    }
  },
  {
    id: 19,
    type: 'thankyou',
    title: 'Merci pour votre attention',
    authors: [
      'Boughanmi Oumayma',
      'Ben Slema Eya', 
      'Chalouf Mariem',
      'Chaabeni Ahmed'
    ]
  }
];