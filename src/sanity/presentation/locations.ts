import { DocumentLocationResolver } from 'sanity/presentation'
import { getDraftId } from 'sanity'
import { map } from 'rxjs'

// Pass 'context' as the second argument
export const locations: DocumentLocationResolver = (params, context) => {
  // Extract 'id' from 'params'
  const { id } = params

  // Set up locations for documents
  if (
    params.type === 'blogPost' ||
    params.type === 'page' ||
    params.type === 'teamMember' ||
    params.type === 'event' || 
    params.type === 'post'
  ) {
    const query = {
      fetch: `*[_id==$id][0]{slug,title,pageName}`,
      listen: `*[_id in [$id,$draftId]]`,
    }
    const queryParams = { id, draftId: getDraftId(id) }
    // Subscribe to the latest slug and title
    const doc$ = context.documentStore.listenQuery(
      query,
      queryParams,
      { perspective: 'drafts' }, // returns a draft article if it exists
    )
    // Return a streaming list of locations
    return doc$.pipe(
      map((doc) => {
        // If the document doesn't exist or have a slug, return null
        if (!doc || !doc.slug?.current) {
          return null
        }
        return {
          message: 'Page Preview',
          locations: [
            {
              title: doc.pageName || doc.title || 'Untitled',
              href: `${doc.slug.current}`,
            },
            //{ title: 'Posts', href: '/' },
          ],
        }
      }),
    )
  }
  return null
}
