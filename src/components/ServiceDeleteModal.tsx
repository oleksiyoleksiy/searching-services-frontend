import { Dialog } from '@radix-ui/react-dialog'
import React, { useEffect, useState } from 'react'
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Service } from '@/types'
import { Button } from './ui/button'

interface ServiceDeleteModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  selectedService?: any
  onCancel?: () => void
  onDelete?: () => void
}

function ServiceDeleteModal({ open, onOpenChange, selectedService, onCancel, onDelete }: ServiceDeleteModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Service</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete "{selectedService?.name}"? This action cannot be undone.</p>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onDelete}>Delete Service</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ServiceDeleteModal