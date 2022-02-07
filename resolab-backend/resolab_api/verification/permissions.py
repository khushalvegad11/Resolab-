from rest_framework import permissions
from resolab_api.verification.models import *

class IsStaff(permissions.BasePermission):
    message = 'Unauthorized: Users outside staff are prohibited.'

    def has_permission(self, request, view):
        return hasattr(User, 'staffprofile')
