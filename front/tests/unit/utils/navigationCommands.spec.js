import {
  createNavigationCommands,
  filterNavigationCommands
} from '@/utils/navigationCommands'

const localize = commands => commands.map(command => ({
  ...command,
  title: command.titleKey
}))

describe('navigationCommands', () => {
  it('only exposes commands whose context is available', () => {
    const commands = createNavigationCommands({})
    const ids = commands.map(command => command.id)

    expect(ids).toContain('dashboard')
    expect(ids).toContain('user-center')
    expect(ids).not.toContain('space-projects')
    expect(ids).not.toContain('project-docs')
    expect(ids).not.toContain('admin-users')
  })

  it('builds existing routes from the current space and project', () => {
    const commands = createNavigationCommands({
      spaceId: 'space-1',
      projectId: 'project-1',
      roleData: {
        'project:project-1': 'dev'
      }
    })

    expect(commands.find(command => command.id === 'space-info').path)
      .toBe('/space/info/space-1')
    expect(commands.find(command => command.id === 'project-docs').path)
      .toBe('/project/doc/project-1')
    expect(commands.find(command => command.id === 'project-constants')).toBeDefined()
  })

  it('filters privileged commands by the existing permission state', () => {
    const memberCommands = createNavigationCommands({
      projectId: 'project-1',
      roleData: {
        'project:project-1': 'guest'
      }
    })
    const adminCommands = createNavigationCommands({ isSuperAdmin: true })

    expect(memberCommands.find(command => command.id === 'project-constants')).toBeUndefined()
    expect(adminCommands.find(command => command.id === 'admin-users')).toBeDefined()
  })

  it('matches localized titles and keywords case-insensitively', () => {
    const commands = localize(createNavigationCommands({ isSuperAdmin: true }))

    expect(filterNavigationCommands(commands, 'ADMIN USER').map(command => command.id))
      .toContain('admin-users')
    expect(filterNavigationCommands(commands, 'message').map(command => command.id))
      .toContain('messages')
  })
})
