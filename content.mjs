// All public copy and organization details live here. Rebuild after editing.
export default {
  name: 'The Kanto Project',
  meta: { title: 'The Kanto Project — A new home for the bulk you don’t want', description: 'We’re a student-founded nonprofit (official 501(c)(3)) bringing the joy of Pokémon cards to underprivileged and hospitalized children through donations and community outreach!' },
  navigation: [{ label: 'Our Story', id: 'our-story' }, { label: 'In Pictures', id: 'in-pictures' }, { label: 'Get Involved', id: 'get-involved' }],
  accessibility: { skip: 'Skip to content', home: 'The Kanto Project — home', menu: 'Menu', closeMenu: 'Close', navigation: 'Main navigation', openPhoto: 'Open photo', closePhoto: 'Close photo', previousPhoto: 'Previous photo', nextPhoto: 'Next photo', photoDialog: 'Project photo journal' },
  hero: { eyebrow: '', lines: ['A new home for', 'the bulk you don’t want.'], description: 'We’re a student-founded nonprofit (official 501(c)(3)) bringing the joy of Pokémon cards to underprivileged and hospitalized children through donations and community outreach!', primary: 'Give cards', secondary: 'Meet the project', footnote: '' },
  story: { label: '01 / Our Story', heading: 'The best part of collecting?\nSharing it.', paragraphs: ['A favorite card can be the start of something special. The Kanto Project grew from a love of collecting and a simple idea: every child, especially those facing hardship or long hospital stays, deserves moments of joy.', 'We collect Pokémon cards and share them with underprivileged and hospitalized children, giving each card a chance to become someone’s favorite. Through donations and community outreach, we bring a little excitement and comfort to children when they need it most.'], milestone: '' },
  impact: { value: '85,100', label: 'cards donated so far', asOf: '' },
  gallery: { label: '02 / In Pictures', heading: 'Little moments.\nLasting favorites.', viewButton: 'View our photo album', pageTitle: 'Our photo album', pageEmptyHeading: 'Photos are on their way.', pageEmptyText: 'This album is empty for now. Photos from our next chapter will appear here.', backButton: 'Back to the project', images: [
  {
    "src": "/assets/photos/photo-02.jpg",
    "width": 1598,
    "height": 1199,
    "caption": "A community delivery",
    "alt": "Four people beside boxes of Pokémon card packs outside a building."
  },
  {
    "src": "/assets/photos/photo-01.jpg",
    "width": 825,
    "height": 1199,
    "caption": "Cool Kids Campaign",
    "alt": "Three people holding Pokémon cards and a donation box at Cool Kids Clubhouse, shown in an Instagram screenshot."
  },
  {
    "src": "/assets/photos/photo-03.jpg",
    "width": 899,
    "height": 1199,
    "caption": "On the way",
    "alt": "A person carrying a box with The Kanto Project logo outdoors."
  },
  {
    "src": "/assets/photos/photo-04.jpg",
    "width": 905,
    "height": 1199,
    "caption": "Ready to share",
    "alt": "Pokémon card packs at a reception desk with a sign crediting The Kanto Project."
  },
  {
    "src": "/assets/photos/photo-05.jpg",
    "width": 899,
    "height": 1199,
    "caption": "Sorting cards",
    "alt": "Pokémon cards arranged in small stacks across a table."
  },
  {
    "src": "/assets/photos/photo-06.jpg",
    "width": 899,
    "height": 1199,
    "caption": "Packed for delivery",
    "alt": "Three boxes of individually packed cards surrounding The Kanto Project logo."
  },
  {
    "src": "/assets/photos/photo-07.jpg",
    "width": 899,
    "height": 1199,
    "caption": "The collection",
    "alt": "Rows of boxes filled with trading cards."
  },
  {
    "src": "/assets/photos/photo-08.jpg",
    "width": 1028,
    "height": 1355,
    "caption": "Sharing a pack",
    "alt": "A person holding a Pokémon card pack at a desk."
  },
  {
    "src": "/assets/photos/photo-09.jpg",
    "width": 1034,
    "height": 1355,
    "caption": "Donation packs",
    "alt": "An open box filled with individually wrapped Pokémon card packs."
  }
] },
  contact: {
    label: '03 / Get Involved', heading: 'Good things start\nwith a hello.',
    description: 'Want to give cards, support the project, or work together? Send us a message. We’d love to hear from you.',
    email: 'contact@thekantoproject.org',
    socials: [{ label: '@thekantoproject', url: 'https://www.instagram.com/thekantoproject/', platform: 'Instagram' }],
    emailLead: 'Or email', socialLead: 'Or DM', socialSuffix: 'on Instagram',
    form: {
      action: 'https://formsubmit.co/lucasduan20@gmail.com',
      endpoint: 'https://formsubmit.co/ajax/lucasduan20@gmail.com',
      subject: 'New message — The Kanto Project',
      nameLabel: 'Your name', emailLabel: 'Your email', messageLabel: 'Your message',
      messagePlaceholder: 'Tell us a little about how you’d like to get involved…',
      requiredNote: 'All fields are required.', submit: 'Send message', sending: 'Sending…',
      success: 'Your message has been submitted. Thank you for getting in touch!',
      error: 'We couldn’t confirm your message was sent. Your text is still here. Please try again, or email us directly below.',
      inactive: 'The message form isn’t ready to receive messages yet. Please email us directly below.',
      invalid: 'Please complete all fields and enter a valid email address.',
      providerNote: 'Messages are processed by', providerName: 'FormSubmit', providerUrl: 'https://formsubmit.co/'
    }
  },
  footer: { mission: 'Giving the cards we love a chance to become someone else’s favorite.', designation: 'An approved 501(c)(3) nonprofit.', backToTop: 'Back to top', copyrightYear: 2026 }
};
