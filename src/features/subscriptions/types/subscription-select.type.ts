export interface SubscriptionSelectItem {
  value: string
  label: string
}

export interface SubscriptionSelectProps {
  id: string
  label: string
  value: string
  items: SubscriptionSelectItem[]
  disabled?: boolean
  onChange: (value: string) => void
}
