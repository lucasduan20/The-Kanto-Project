// All public copy and organization details live here. Rebuild after editing.
export default {
  name: 'The Kanto Project',
  meta: { title: 'The Kanto Project — A new home for the bulk you don’t want', description: 'A student-founded nonprofit sharing the joy of Pokémon cards with children through card donations and community outreach.' },
  navigation: [{ label: 'Our Story', id: 'our-story' }, { label: 'In Pictures', id: 'in-pictures' }, { label: 'Get Involved', id: 'get-involved' }],
  accessibility: { skip: 'Skip to content', home: 'The Kanto Project — home', menu: 'Menu', closeMenu: 'Close', navigation: 'Main navigation', openPhoto: 'Open photo', closePhoto: 'Close photo', previousPhoto: 'Previous photo', nextPhoto: 'Next photo', photoDialog: 'Project photo journal' },
  hero: { eyebrow: '', lines: ['A new home for', 'the bulk you don’t want.'], description: 'We’re a student-founded nonprofit sharing the joy of Pokémon cards with children through card donations and community outreach.', primary: 'Give cards', secondary: 'Meet the project', footnote: '' },
  story: { label: '01 / Our Story', heading: 'The best part of collecting?\nSharing it.', paragraphs: ['A favorite card can be the start of something special. The Kanto Project grew from a love of collecting and a simple idea: that joy is even better when it’s shared.', 'We collect Pokémon cards and share them with children, giving the cards we love a chance to become someone else’s favorite. Through card donations and community outreach, we’re bringing a little of that excitement to a new collection.'], milestone: '' },
  impact: { value: '25,000', label: 'cards donated so far', asOf: '' },
  gallery: { label: '02 / In Pictures', heading: 'Little moments.\nLasting favorites.', viewButton: 'View our photo album', pageTitle: 'Our photo album', pageEmptyHeading: 'Photos are on their way.', pageEmptyText: 'This album is empty for now. Photos from our next chapter will appear here.', backButton: 'Back to the project', images: [] },
  contact: {
    label: '03 / Get Involved', heading: 'Good things start\nwith a hello.',
    description: 'Want to give cards, support the project, or work together? Send us a message. We’d love to hear from you.',
    email: 'contact@thekantoproject.org',
    socials: [{ label: '@thekantoproject', url: 'https://www.instagram.com/thekantoproject/', platform: 'Instagram' }],
    emailLead: 'Or email', socialLead: 'Or DM', socialSuffix: 'on Instagram',
    form: {
      action: 'https://formsubmit.co/contact@thekantoproject.org',
      endpoint: 'https://formsubmit.co/ajax/contact@thekantoproject.org',
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
