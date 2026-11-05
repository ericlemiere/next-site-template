import type { File, Reference } from '@sanity/types'

// This file contains more specific types that are only used in the Sanity schema

export interface SanityPageReference extends Reference {
  url: string
}

export interface SanityFile extends File {
  asset: SanityPageReference
}

import type { Slug } from 'sanity'

// This file contains high-level types that are used in multiple places in the project

export interface SanityPage {
  slug: Slug
}
