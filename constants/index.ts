export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
  {
    label: 'My Tickets',
    route: '/profile/mytickets',
  },
  {
    label: 'Events Created',
    route: '/profile/createdevents',
  }
  
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}

export const SignedOutNav = [
  {
    label: 'Sign In',
    route: '/sign-in',
  },
  {
    label: 'Sign Up',
    route: '/sign-up',
  },
  {
    label: 'Explore',
    route: '#events',
  }
]
